"use server";

import { createClient } from "@/lib/supabase/server";
import { calculateNodeScore } from "@/lib/exam/utils";
import type { ExamType } from "@/lib/exam/schemas";

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
 * - Zapisuje historię egzaminu (exam_attempts, exam_answers)
 * - Aktualizuje wyniki węzłów zgodnie z logiką +20/-10
 * - Clampuje wyniki w przedziale [0, 100]
 *
 * @param exam - Wygenerowany egzamin (zawiera pytania z correctAnswer)
 * @param userAnswers - Odpowiedzi użytkownika na pytania
 * @returns Wynik operacji (success/error)
 */
export async function submitExamResults(
  exam: ExamType,
  userAnswers: UserAnswer[]
): Promise<
  | { success: true; examAttemptId: string; totalScore: number }
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
      // Nie przerywamy - próbujemy zaktualizować score węzłów mimo błędu
    }

    // 7. Aktualizuj score węzłów zgodnie z logiką +20/-10
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

    // 8. Dla każdego węzła: pobierz aktualny score i zaktualizuj
    for (const [nodeId, counts] of nodeScoreUpdates.entries()) {
      // Pobierz aktualny score węzła
      const { data: currentScoreData, error: fetchError } = await supabase
        .from("user_node_scores")
        .select("score")
        .eq("user_id", user.id)
        .eq("node_id", nodeId)
        .maybeSingle();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 = brak rekordu (to OK, użyjemy null)
        console.error(`Błąd pobierania score dla węzła ${nodeId}:`, fetchError);
        continue;
      }

      const currentScore: number | null = currentScoreData?.score ?? null;

      // Oblicz nowy score: dla każdej poprawnej odpowiedzi +20, dla każdej błędnej -10
      // Sumujemy wszystkie zmiany i na końcu clampujemy
      let newScore = currentScore ?? 0;
      newScore += counts.correct * 20;
      newScore -= counts.incorrect * 10;

      // Clamp do [0, 100]
      newScore = Math.max(0, Math.min(100, newScore));

      // Zapisz lub zaktualizuj score węzła
      const { error: updateError } = await supabase
        .from("user_node_scores")
        .upsert(
          {
            user_id: user.id,
            node_id: nodeId,
            score: newScore,
          },
          {
            onConflict: "user_id,node_id",
          }
        );

      if (updateError) {
        console.error(`Błąd aktualizacji score dla węzła ${nodeId}:`, updateError);
        // Nie przerywamy - kontynuujemy dla innych węzłów
      }
    }

    return {
      success: true,
      examAttemptId: examAttempt.id,
      totalScore: totalScorePercentage,
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
