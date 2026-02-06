"use server";

import { createClient } from "@/lib/supabase/server";
import { calculateNodeScore } from "@/lib/exam/utils";
import type { ExamType } from "@/lib/exam/schemas";
import type { UserScores } from "@/lib/mindmap/data";

/**
 * Odpowiedź użytkownika na pojedyncze pytanie
 */
export interface UserAnswer {
  questionIndex: number;
  answer: "A" | "B" | "C" | "D";
}

/**
 * Server Action do zapisywania wyników egzaminu i aktualizacji score węzłów.
 * Zgodne z requirements.md (Funkcja 5):
 * - Zapisuje historię egzaminu (exam_attempts, exam_answers) do Supabase
 * - Oblicza nowe score'y węzłów zgodnie z logiką +20/-10 (do aktualizacji lokalnie)
 * - Clampuje wyniki w przedziale [0, 100]
 *
 * @param exam - Wygenerowany egzamin (zawiera pytania z correctAnswer)
 * @param userAnswers - Odpowiedzi użytkownika na pytania
 * @returns Wynik operacji (success/error) + zaktualizowane score'y węzłów
 */
export async function submitExamResults(
  exam: ExamType,
  userAnswers: UserAnswer[]
): Promise<
  | {
      success: true;
      examAttemptId: string;
      totalScore: number;
      updatedScores: UserScores;
    }
  | { success: false; error: string }
> {
  try {
    // 1. Sprawdź autoryzację użytkownika
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "Brak autoryzacji. Zaloguj się ponownie.",
      };
    }

    // 2. Walidacja: sprawdź czy liczba odpowiedzi zgadza się z liczbą pytań
    if (userAnswers.length !== exam.questions.length) {
      return {
        success: false,
        error: "Liczba odpowiedzi nie zgadza się z liczbą pytań.",
      };
    }

    // 3. Oblicz wyniki dla każdego pytania
    const questionResults = exam.questions.map((question, index) => {
      const userAnswer = userAnswers.find((a) => a.questionIndex === index);
      if (!userAnswer) {
        throw new Error(`Brak odpowiedzi dla pytania ${index}`);
      }

      const isCorrect = userAnswer.answer === question.correctAnswer;

      return {
        questionIndex: index,
        question,
        userAnswer: userAnswer.answer,
        isCorrect,
        nodeId: question.nodeId,
      };
    });

    // 4. Oblicz wynik ogólny
    const correctCount = questionResults.filter((r) => r.isCorrect).length;
    const totalQuestions = exam.questions.length;
    const totalScorePercentage = Math.round(
      (correctCount / totalQuestions) * 100
    );

    // 5. Utwórz rekord exam_attempts
    const { data: examAttempt, error: attemptError } = await supabase
      .from("exam_attempts")
      .insert({
        user_id: user.id,
        exam_mode: exam.mode,
        total_questions: totalQuestions,
        correct_answers: correctCount,
        total_score_percentage: totalScorePercentage,
        node_ids: exam.nodeIds,
        completed_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (attemptError || !examAttempt) {
      console.error("Błąd zapisu exam_attempts:", attemptError);
      return {
        success: false,
        error: "Nie udało się zapisać wyniku egzaminu.",
      };
    }

    // 6. Zapisz odpowiedzi użytkownika (exam_answers)
    const answersToInsert = questionResults.map((result) => ({
      exam_attempt_id: examAttempt.id,
      question_index: result.questionIndex,
      user_answer: result.userAnswer,
      correct_answer: result.question.correctAnswer,
      is_correct: result.isCorrect,
      node_id: result.nodeId || null,
    }));

    const { error: answersError } = await supabase
      .from("exam_answers")
      .insert(answersToInsert);

    if (answersError) {
      console.error("Błąd zapisu exam_answers:", answersError);
      // Nie przerywamy - kontynuujemy z obliczaniem score'ów
    }

    // 7. Oblicz nowe score'y węzłów zgodnie z logiką +20/-10
    // Grupuj odpowiedzi według nodeId (jeden węzeł może mieć wiele pytań)
    const nodeScoreUpdates = new Map<string, { correct: number; incorrect: number }>();

    questionResults.forEach((result) => {
      if (!result.nodeId) return; // Pytanie bez przypisanego węzła

      const current = nodeScoreUpdates.get(result.nodeId) || {
        correct: 0,
        incorrect: 0,
      };

      if (result.isCorrect) {
        current.correct++;
      } else {
        current.incorrect++;
      }

      nodeScoreUpdates.set(result.nodeId, current);
    });

    // 8. Oblicz zaktualizowane score'y dla każdego węzła
    // Uwaga: W Server Action nie mamy dostępu do localStorage, więc zwracamy tylko obliczone wartości
    // Aktualizacja localStorage nastąpi w komponencie klienckim
    const updatedScores: UserScores = {};

    // Pobierz aktualne score'y z Supabase (dla kompatybilności wstecznej)
    // Jeśli nie ma w Supabase, użyjemy 0 jako domyślnej wartości
    for (const [nodeId, counts] of nodeScoreUpdates.entries()) {
      const { data: currentScoreData } = await supabase
        .from("user_node_scores")
        .select("score")
        .eq("user_id", user.id)
        .eq("node_id", nodeId)
        .maybeSingle();

      const currentScore: number | null = currentScoreData?.score ?? null;

      // Oblicz nowy score: dla każdej poprawnej odpowiedzi +20, dla każdej błędnej -10
      // Sumujemy wszystkie zmiany i na końcu clampujemy
      let newScore = currentScore ?? 0;
      newScore += counts.correct * 20;
      newScore -= counts.incorrect * 10;

      // Clamp do [0, 100]
      newScore = Math.max(0, Math.min(100, newScore));

      updatedScores[nodeId] = newScore;
    }

    return {
      success: true,
      examAttemptId: examAttempt.id,
      totalScore: totalScorePercentage,
      updatedScores,
    };
  } catch (error) {
    console.error("Błąd zapisywania wyników egzaminu:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Wystąpił nieoczekiwany błąd podczas zapisywania wyników.",
    };
  }
}
