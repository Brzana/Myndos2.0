import type { Node } from "reactflow";
import type { MindMapNodeData } from "./data";

/** Kategorie węzłów dla trybów egzaminu (Funkcja 4, requirements.md). */
export type ScoreCategory =
  | "nieodkryty" // Szary, null – tryb „Poznawanie”
  | "slabe_obszary" // Czerwony, 0–39 – tryb „Słabe obszary”
  | "w_trakcie" // Żółty, 40–79
  | "opanowany" // Zielony, 80–100
  | "pelny_material"; // Wszystkie węzły – tryb „Pełny materiał”

/**
 * Aktualizuje wynik węzła w tablicy nodes (immutable).
 * Score jest clampowany w [0, 100]. null = nieodkryty.
 */
export function updateNodeScore(
  nodes: Node<MindMapNodeData>[],
  nodeId: string,
  newScore: number | null
): Node<MindMapNodeData>[] {
  const clamped =
    newScore === null ? null : Math.max(0, Math.min(100, newScore));
  return nodes.map((node) =>
    node.id === nodeId
      ? { ...node, data: { ...node.data, score: clamped } }
      : node
  );
}

/**
 * Zwraca ID węzłów spełniających daną kategorię (do generowania egzaminów).
 * Zgodne z trybami z requirements.md: Poznawanie, Słabe obszary, Pełny materiał.
 */
export function getNodesByScoreCategory(
  nodes: Node<MindMapNodeData>[],
  category: ScoreCategory
): string[] {
  if (category === "pelny_material") {
    return nodes.map((n) => n.id);
  }
  return nodes
    .filter((node) => {
      const s = node.data?.score ?? null;
      switch (category) {
        case "nieodkryty":
          return s === null;
        case "slabe_obszary":
          return s !== null && s < 40;
        case "w_trakcie":
          return s !== null && s >= 40 && s < 80;
        case "opanowany":
          return s !== null && s >= 80;
        default:
          return false;
      }
    })
    .map((n) => n.id);
}

/**
 * Zwraca kolor węzła na podstawie wyniku (score).
 *
 * Logika kolorowania:
 * - null (nieodkryty/brak danych) = Szary
 * - 0-39 pkt = Odcienie czerwonego
 * - 40-79 pkt = Odcienie żółtego/pomarańczowego
 * - 80-100 pkt = Odcienie zielonego
 */
export function getNodeColor(score: number | null): {
  background: string;
  border: string;
  text: string;
} {
  // Nieodkryty węzeł - szary
  if (score === null) {
    return {
      background: "#6B7280", // gray-500
      border: "#4B5563", // gray-600
      text: "#F9FAFB", // gray-50
    };
  }

  // Clamp score do zakresu 0-100
  const clampedScore = Math.max(0, Math.min(100, score));

  // 0-39: Czerwony (słaby wynik)
  if (clampedScore < 40) {
    // Interpolacja od ciemniejszego do jaśniejszego czerwonego
    const intensity = clampedScore / 39;
    return {
      background: interpolateColor("#991B1B", "#EF4444", intensity), // red-800 to red-500
      border: interpolateColor("#7F1D1D", "#DC2626", intensity), // red-900 to red-600
      text: "#FEF2F2", // red-50
    };
  }

  // 40-79: Żółty/Pomarańczowy (średni wynik)
  if (clampedScore < 80) {
    const intensity = (clampedScore - 40) / 39;
    return {
      background: interpolateColor("#EA580C", "#EAB308", intensity), // orange-600 to yellow-500
      border: interpolateColor("#C2410C", "#CA8A04", intensity), // orange-700 to yellow-600
      text: "#1F2937", // gray-800 (ciemny tekst dla lepszego kontrastu)
    };
  }

  // 80-100: Zielony (wysoki wynik)
  const intensity = (clampedScore - 80) / 20;
  return {
    background: interpolateColor("#16A34A", "#22C55E", intensity), // green-600 to green-500
    border: interpolateColor("#15803D", "#16A34A", intensity), // green-700 to green-600
    text: "#F0FDF4", // green-50
  };
}

/**
 * Interpoluje między dwoma kolorami hex.
 */
function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const hex1 = color1.replace("#", "");
  const hex2 = color2.replace("#", "");

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

/**
 * Zwraca opis poziomu opanowania na podstawie score.
 */
export function getScoreLabel(score: number | null): string {
  if (score === null) return "Nieodkryty";
  if (score < 40) return "Do poprawy";
  if (score < 80) return "W trakcie nauki";
  return "Opanowany";
}
