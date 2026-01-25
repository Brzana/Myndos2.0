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
