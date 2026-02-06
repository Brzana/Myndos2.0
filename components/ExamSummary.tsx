"use client";

import { useRouter } from "next/navigation";
import type { ExamType } from "@/lib/exam/schemas";
import type { UserAnswer } from "@/actions/exam-results";
import { EXAM_MODE_LABELS } from "@/lib/exam/utils";

interface ExamSummaryProps {
  exam: ExamType;
  userAnswers: UserAnswer[];
  totalScore: number;
  isLoading?: boolean;
}

/**
 * Komponent podsumowania egzaminu (Funkcja 5, requirements.md)
 * Wyświetla wynik ogólny i pozwala wrócić do Dashboardu
 */
export function ExamSummary({
  exam,
  userAnswers,
  totalScore,
  isLoading = false,
}: ExamSummaryProps) {
  const router = useRouter();

  // Oblicz szczegóły wyników
  const totalQuestions = exam.questions.length;
  const correctAnswers = userAnswers.filter(
    (answer) =>
      exam.questions[answer.questionIndex].correctAnswer === answer.answer
  ).length;

  const handleBackToDashboard = () => {
    // Odśwież dashboard aby zobaczyć zaktualizowane score'y
    router.push("/dashboard");
    router.refresh();
  };

  // Określ kolor wyniku
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Świetnie!";
    if (score >= 60) return "Dobrze!";
    if (score >= 40) return "Może być lepiej";
    return "Wymaga poprawy";
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Egzamin zakończony
          </h1>
          <p className="text-slate-400">
            Tryb: {EXAM_MODE_LABELS[exam.mode]}
          </p>
        </div>

        {/* Wynik ogólny */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-6 text-center">
          <div className="mb-4">
            <p className="text-slate-400 text-sm mb-2">Twój wynik</p>
            <div className={`text-6xl font-bold ${getScoreColor(totalScore)}`}>
              {totalScore}%
            </div>
            <p className={`text-xl font-semibold mt-2 ${getScoreColor(totalScore)}`}>
              {getScoreLabel(totalScore)}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-700">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-slate-400 text-sm">Poprawne odpowiedzi</p>
                <p className="text-2xl font-bold text-green-400">
                  {correctAnswers}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Wszystkie pytania</p>
                <p className="text-2xl font-bold text-white">
                  {totalQuestions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Szczegóły odpowiedzi */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Szczegóły odpowiedzi
          </h2>
          <div className="space-y-3">
            {exam.questions.map((question, index) => {
              const userAnswer = userAnswers.find(
                (a) => a.questionIndex === index
              );
              const isCorrect =
                userAnswer?.answer === question.correctAnswer;
              const userAnswerText = userAnswer
                ? question.options[userAnswer.answer.charCodeAt(0) - 65]
                : "Brak odpowiedzi";

              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect
                      ? "bg-green-900/20 border-green-600"
                      : "bg-red-900/20 border-red-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-300">
                      Pytanie {index + 1}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isCorrect ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {isCorrect ? "✓ Poprawne" : "✗ Błędne"}
                    </span>
                  </div>
                  <p className="text-white mb-2">{question.question}</p>
                  <div className="text-sm">
                    <p className="text-slate-400">
                      Twoja odpowiedź:{" "}
                      <span className="text-slate-200">{userAnswerText}</span>
                    </p>
                    {!isCorrect && (
                      <p className="text-green-400 mt-1">
                        Poprawna odpowiedź:{" "}
                        {
                          question.options[
                            question.correctAnswer.charCodeAt(0) - 65
                          ]
                        }
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Przycisk powrotu */}
        <div className="text-center">
          <button
            onClick={handleBackToDashboard}
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {isLoading ? "Zapisywanie..." : "Powrót do mapy"}
          </button>
        </div>
      </div>
    </div>
  );
}
