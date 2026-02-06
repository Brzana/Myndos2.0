import type { ExamMode } from "./types";
import type { ScoreCategory } from "@/lib/mindmap/utils";

/**
 * Mapuje tryb egzaminu na kategorię węzłów do filtrowania.
 * Zgodne z requirements.md:
 * - Poznawanie: węzły szare (nieodkryte)
 * - Słabe obszary: węzły czerwone (niski score, 0-39)
 * - Pełny materiał: wszystkie węzły
 */
export function examModeToScoreCategory(mode: ExamMode): ScoreCategory {
  switch (mode) {
    case "poznawanie":
      return "nieodkryty";
    case "slabe_obszary":
      return "slabe_obszary";
    case "pelny_material":
      return "pelny_material";
    default:
      // Fallback - nie powinno się zdarzyć dzięki typom TypeScript
      return "pelny_material";
  }
}

/** Etykiety trybów egzaminu do wyświetlenia w UI */
export const EXAM_MODE_LABELS: Record<ExamMode, string> = {
  poznawanie: "Poznawanie",
  slabe_obszary: "Słabe obszary",
  pelny_material: "Pełny materiał",
};

/** Opisy trybów egzaminu do wyświetlenia w UI */
export const EXAM_MODE_DESCRIPTIONS: Record<ExamMode, string> = {
  poznawanie: "Priorytet dla węzłów nieodkrytych (szarych)",
  slabe_obszary: "Priorytet dla węzłów z niskim wynikiem (czerwonych)",
  pelny_material: "Losowe węzły z całej mapy",
};

/**
 * Oblicza nowy wynik węzła na podstawie odpowiedzi w egzaminie.
 * Zgodne z requirements.md (Funkcja 5):
 * - Poprawna odpowiedź: +20 pkt
 * - Błędna odpowiedź: -10 pkt
 * - Wynik jest clampowany w przedziale [0, 100]
 *
 * @param currentScore - Aktualny wynik węzła (null = nieodkryty, traktowany jako 0)
 * @param isCorrect - Czy odpowiedź była poprawna
 * @returns Nowy wynik węzła (0-100) lub null jeśli nieodkryty i błędna odpowiedź (pozostaje nieodkryty)
 */
export function calculateNodeScore(
  currentScore: number | null,
  isCorrect: boolean
): number {
  // Jeśli węzeł nieodkryty (null) i błędna odpowiedź, pozostaje nieodkryty (0)
  // Jeśli nieodkryty i poprawna odpowiedź, zaczynamy od 0 + 20 = 20
  const baseScore = currentScore ?? 0;

  const newScore = isCorrect ? baseScore + 20 : baseScore - 10;

  // Clamp do zakresu [0, 100]
  return Math.max(0, Math.min(100, newScore));
}
