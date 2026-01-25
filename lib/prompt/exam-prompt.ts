import type { NodeContext } from "@/lib/exam/types";

/**
 * Prompt engineering dla generowania egzaminów (Funkcja 4, requirements.md)
 * Wymusza format JSON zwrotny zgodny ze schematem ExamSchema.
 */

/**
 * Buduje prompt dla LLM na podstawie kontekstu węzłów.
 * Prompt wymusza format JSON z pytaniami typu ABCD.
 */
export function buildExamPrompt(nodeContexts: NodeContext[]): string {
  const nodesContext = nodeContexts
    .map((node) => {
      const parts: string[] = [];
      parts.push(`## ${node.label}`);
      if (node.description) {
        parts.push(`Opis: ${node.description}`);
      }
      if (node.article) {
        // Ograniczamy długość artykułu, aby nie przekroczyć limitów tokenów
        const articlePreview = node.article.substring(0, 2000);
        parts.push(`Treść edukacyjna:\n${articlePreview}`);
      }
      if (node.exampleQuestions && node.exampleQuestions.length > 0) {
        parts.push(
          `Przykładowe pytania:\n${node.exampleQuestions
            .map((q, i) => `${i + 1}. ${q}`)
            .join("\n")}`
        );
      }
      return parts.join("\n\n");
    })
    .join("\n\n---\n\n");

  return `Jesteś asystentem edukacyjnym. Twoim zadaniem jest wygenerowanie egzaminu składającego się z pytań zamkniętych typu ABCD (jedna poprawna odpowiedź).

KONTEKST TEMATYCZNY:
${nodesContext}

INSTRUKCJE:
1. Wygeneruj dokładnie 10 pytań egzaminacyjnych na podstawie powyższego kontekstu.
2. Każde pytanie musi mieć 4 opcje odpowiedzi (A, B, C, D).
3. Tylko jedna odpowiedź jest poprawna.
4. Pytania powinny testować zrozumienie materiału, nie tylko pamięć.
5. Poziom trudności: średni do zaawansowany.

FORMAT ODPOWIEDZI (JSON):
Musisz zwrócić TYLKO poprawny JSON bez żadnych dodatkowych komentarzy, markdown, ani tekstu przed/po JSON. Format:

{
  "questions": [
    {
      "question": "Treść pytania?",
      "options": ["Opcja A", "Opcja B", "Opcja C", "Opcja D"],
      "correctAnswer": "A"
    }
  ]
}

WAŻNE:
- Zwróć TYLKO JSON, bez dodatkowego tekstu.
- Każde pytanie musi mieć dokładnie 4 opcje.
- correctAnswer musi być "A", "B", "C" lub "D".
- Wygeneruj dokładnie 10 pytań.`;
}
