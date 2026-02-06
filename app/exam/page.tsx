"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExamView } from "@/components/ExamView";
import { ExamSummary } from "@/components/ExamSummary";
import { submitExamResults } from "@/actions/exam-results";
import { updateNodeScores } from "@/lib/mindmap/data";
import type { ExamType } from "@/lib/exam/schemas";
import type { UserAnswer } from "@/actions/exam-results";

/**
 * Strona egzaminu (Funkcja 5, requirements.md)
 * 
 * Przebieg:
 * 1. Pobiera egzamin z localStorage (zapisany przez DashboardClient)
 * 2. Wyświetla ExamView do rozwiązywania
 * 3. Po zakończeniu wyświetla ExamSummary i zapisuje wyniki
 */
export default function ExamPage() {
  const router = useRouter();
  const [exam, setExam] = useState<ExamType | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[] | null>(null);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Pobierz egzamin z localStorage przy mount
  useEffect(() => {
    const storedExam = localStorage.getItem("current_exam");
    if (!storedExam) {
      // Brak egzaminu - przekieruj do dashboardu
      router.push("/dashboard");
      return;
    }

    try {
      const parsedExam: ExamType = JSON.parse(storedExam);
      setExam(parsedExam);
    } catch (error) {
      console.error("Błąd parsowania egzaminu z localStorage:", error);
      router.push("/dashboard");
    }
  }, [router]);

  const handleExamComplete = async (answers: UserAnswer[]) => {
    if (!exam) return;

    setUserAnswers(answers);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitExamResults(exam, answers);

      if (!result.success) {
        setSubmitError(result.error);
        setIsSubmitting(false);
        return;
      }

      // Aktualizuj score'y węzłów w localStorage
      if (result.updatedScores) {
        updateNodeScores(result.updatedScores);
      }

      // Sukces - wyświetl podsumowanie
      setTotalScore(result.totalScore);
      
      // Usuń egzamin z localStorage (już zapisany)
      localStorage.removeItem("current_exam");
    } catch (error) {
      console.error("Błąd podczas zapisywania wyników:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Wystąpił nieoczekiwany błąd podczas zapisywania wyników."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm("Czy na pewno chcesz anulować egzamin? Postęp nie zostanie zapisany.")) {
      localStorage.removeItem("current_exam");
      router.push("/dashboard");
    }
  };

  // Loading state
  if (!exam) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Ładowanie egzaminu...</div>
      </div>
    );
  }

  // Jeśli egzamin zakończony - pokaż podsumowanie
  if (userAnswers && totalScore !== null) {
    return (
      <ExamSummary
        exam={exam}
        userAnswers={userAnswers}
        totalScore={totalScore}
        isLoading={isSubmitting}
      />
    );
  }

  // Rozwiązywanie egzaminu
  return (
    <>
      <ExamView exam={exam} onComplete={handleExamComplete} onCancel={handleCancel} />
      {submitError && (
        <div className="fixed bottom-4 right-4 p-4 bg-red-900/90 border border-red-700 rounded-lg text-red-200 text-sm max-w-md">
          <strong>Błąd:</strong> {submitError}
        </div>
      )}
    </>
  );
}
