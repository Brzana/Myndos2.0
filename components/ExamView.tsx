"use client";

import { useState, useCallback } from "react";
import type { ExamType } from "@/lib/exam/schemas";
import type { UserAnswer } from "@/actions/exam-results";

interface ExamViewProps {
  exam: ExamType;
  onComplete: (answers: UserAnswer[]) => void;
  onCancel?: () => void;
}

/**
 * Komponent do rozwiązywania egzaminu (Funkcja 5, requirements.md)
 * Wyświetla pytania jedno po drugim, pozwala zaznaczyć tylko jedną odpowiedź
 */
export function ExamView({ exam, onComplete, onCancel }: ExamViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, "A" | "B" | "C" | "D">>(
    new Map()
  );

  const currentQuestion = exam.questions[currentQuestionIndex];
  const selectedAnswer = answers.get(currentQuestionIndex);
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswerSelect = useCallback((answer: "A" | "B" | "C" | "D") => {
    setAnswers((prev) => {
      const newMap = new Map(prev);
      newMap.set(currentQuestionIndex, answer);
      return newMap;
    });
  }, [currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (!selectedAnswer) {
      return; // Nie pozwól przejść dalej bez zaznaczenia odpowiedzi
    }

    // Zapisz aktualną odpowiedź do Map
    const updatedAnswers = new Map(answers);
    updatedAnswers.set(currentQuestionIndex, selectedAnswer);
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Koniec egzaminu - przekonwertuj Map na UserAnswer[] i wywołaj onComplete
      const userAnswers: UserAnswer[] = Array.from(updatedAnswers.entries())
        .map(([questionIndex, answer]) => ({
          questionIndex,
          answer,
        }))
        .sort((a, b) => a.questionIndex - b.questionIndex);

      onComplete(userAnswers);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [selectedAnswer, isLastQuestion, answers, currentQuestionIndex, onComplete]);

  const handlePrevious = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [isFirstQuestion]);

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header z postępem */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-white">Egzamin</h1>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-white text-sm underline"
            >
              Anuluj egzamin
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / exam.questions.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-sm text-slate-400 whitespace-nowrap">
              {currentQuestionIndex + 1} / {exam.questions.length}
            </span>
          </div>
        </div>

        {/* Pytanie */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQuestion.question}
          </h2>

          {/* Opcje odpowiedzi (radio buttons) */}
          <div className="space-y-3">
            {(["A", "B", "C", "D"] as const).map((option) => {
              const optionText = currentQuestion.options[
                option.charCodeAt(0) - 65
              ]; // A=0, B=1, C=2, D=3
              const isSelected = selectedAnswer === option;

              return (
                <label
                  key={option}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-900/30 border-blue-500"
                      : "bg-slate-700 border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={isSelected}
                    onChange={() => handleAnswerSelect(option)}
                    className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-white mr-2">
                      {option}.
                    </span>
                    <span className="text-slate-200">{optionText}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Przyciski nawigacji */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={isFirstQuestion}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            Poprzednie
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {isLastQuestion ? "Zakończ egzamin" : "Dalej"}
          </button>
        </div>
      </div>
    </div>
  );
}
