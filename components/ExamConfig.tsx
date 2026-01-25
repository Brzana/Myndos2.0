"use client";

import { useState } from "react";
import type { ExamMode } from "@/lib/exam";
import {
  EXAM_MODE_LABELS,
  EXAM_MODE_DESCRIPTIONS,
} from "@/lib/exam/utils";

interface ExamConfigProps {
  onStartExam: (mode: ExamMode) => void;
  isLoading?: boolean;
}

/**
 * Komponent konfiguracji egzaminu (Funkcja 4, requirements.md)
 * Umożliwia wybór trybu egzaminu i rozpoczęcie testu
 */
export function ExamConfig({ onStartExam, isLoading = false }: ExamConfigProps) {
  const [selectedMode, setSelectedMode] = useState<ExamMode>("poznawanie");

  const handleStart = () => {
    onStartExam(selectedMode);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4">Rozpocznij Egzamin</h2>
      
      {/* Dropdown wyboru trybu */}
      <div className="mb-4">
        <label
          htmlFor="exam-mode"
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          Wybierz tryb egzaminu:
        </label>
        <select
          id="exam-mode"
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value as ExamMode)}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {(Object.keys(EXAM_MODE_LABELS) as ExamMode[]).map((mode) => (
            <option key={mode} value={mode}>
              {EXAM_MODE_LABELS[mode]}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-slate-400">
          {EXAM_MODE_DESCRIPTIONS[selectedMode]}
        </p>
      </div>

      {/* Przycisk rozpoczęcia */}
      <button
        onClick={handleStart}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
      >
        {isLoading ? "Generowanie..." : "Rozpocznij egzamin"}
      </button>
    </div>
  );
}
