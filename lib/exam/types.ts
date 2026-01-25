/**
 * Typy dla systemu egzaminów (Funkcja 4, requirements.md)
 */

/** Tryby egzaminu dostępne w UI */
export type ExamMode = "poznawanie" | "slabe_obszary" | "pelny_material";

/** Pojedyncze pytanie egzaminacyjne typu ABCD */
export interface ExamQuestion {
  /** Treść pytania */
  question: string;
  /** 4 odpowiedzi (A, B, C, D) */
  options: [string, string, string, string];
  /** Poprawna odpowiedź: 'A', 'B', 'C' lub 'D' */
  correctAnswer: "A" | "B" | "C" | "D";
  /** ID węzła, z którego pochodzi pytanie (opcjonalne, dla śledzenia) */
  nodeId?: string;
}

/** Kompletny egzamin składający się z pytań */
export interface Exam {
  /** Lista pytań (limit 10 w MVP) */
  questions: ExamQuestion[];
  /** Tryb egzaminu */
  mode: ExamMode;
  /** ID węzłów użytych do generacji (dla śledzenia) */
  nodeIds: string[];
}

/** Kontekst węzła wysyłany do LLM */
export interface NodeContext {
  /** ID węzła */
  id: string;
  /** Nazwa/temat węzła */
  label: string;
  /** Opis węzła */
  description?: string;
  /** Treść edukacyjna (Markdown) */
  article?: string;
  /** Przykładowe pytania (kontekst dla LLM) */
  exampleQuestions?: string[];
}
