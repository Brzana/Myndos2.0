"use server";

import { createClient } from "@/lib/supabase/server";
import { createOpenAIClient } from "@/lib/openai/client";
import { buildExamPrompt } from "@/lib/prompt/exam-prompt";
import { ExamSchema, type ExamType } from "@/lib/exam/schemas";
import { initialNodes } from "@/lib/mindmap/data";
import { getNodesByScoreCategory } from "@/lib/mindmap/utils";
import { examModeToScoreCategory } from "@/lib/exam/utils";
import type { ExamMode, NodeContext } from "@/lib/exam/types";
import type { Node } from "reactflow";
import type { MindMapNodeData } from "@/lib/mindmap/data";

/**
 * Server Action do generowania egzaminu (Funkcja 4, requirements.md)
 * 
 * @param mode - Tryb egzaminu (poznawanie, slabe_obszary, pelny_material)
 * @returns Wygenerowany egzamin lub błąd
 */
export async function generateExam(
  mode: ExamMode
): Promise<{ success: true; exam: ExamType } | { success: false; error: string }> {
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

    // 2. Użyj węzłów z data.ts (initialNodes już zawiera scores)
    const nodesWithScores: Node<MindMapNodeData>[] = initialNodes;

    // 3. Filtruj węzły na podstawie trybu egzaminu
    const category = examModeToScoreCategory(mode);
    const selectedNodeIds = getNodesByScoreCategory(nodesWithScores, category);

    if (selectedNodeIds.length === 0) {
      return {
        success: false,
        error: `Brak węzłów spełniających kryteria trybu "${mode}". Spróbuj innego trybu.`,
      };
    }

    // 4. Losowo wybierz węzły (maksymalnie 5 dla kontekstu, aby nie przekroczyć limitów tokenów)
    const shuffled = [...selectedNodeIds].sort(() => Math.random() - 0.5);
    const selectedIds = shuffled.slice(0, Math.min(5, shuffled.length));

    // 5. Przygotuj kontekst węzłów dla LLM
    const nodeContexts: NodeContext[] = selectedIds
      .map((nodeId) => {
        const node = nodesWithScores.find((n) => n.id === nodeId);
        return node;
      })
      .filter((node): node is Node<MindMapNodeData> => node !== undefined)
      .map((node) => {
        const context: NodeContext = {
          id: node.id,
          label: node.data.label,
        };
        if (node.data.description) {
          context.description = node.data.description;
        }
        if (node.data.article) {
          context.article = node.data.article;
        }
        if (node.data.exampleQuestions) {
          context.exampleQuestions = node.data.exampleQuestions;
        }
        return context;
      });

    if (nodeContexts.length === 0) {
      return {
        success: false,
        error: "Nie udało się przygotować kontekstu węzłów.",
      };
    }

    // 6. Zbuduj prompt
    const prompt = buildExamPrompt(nodeContexts);

    // 7. Wywołaj OpenAI API
    const openai = createOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Użyj gpt-4o-mini dla oszczędności, można zmienić na gpt-4
      messages: [
        {
          role: "system",
          content:
            "Jesteś asystentem edukacyjnym specjalizującym się w tworzeniu pytań egzaminacyjnych. Zawsze zwracasz TYLKO poprawny JSON bez dodatkowego tekstu.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }, // Wymusza format JSON
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      return {
        success: false,
        error: "Brak odpowiedzi z OpenAI API.",
      };
    }

    // 8. Parsuj i waliduj odpowiedź JSON
    let parsedResponse: unknown;
    try {
      parsedResponse = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Błąd parsowania JSON:", parseError);
      return {
        success: false,
        error: "Nieprawidłowy format odpowiedzi z AI. Spróbuj ponownie.",
      };
    }

    // 10. Waliduj za pomocą schematu Zod
    const validationResult = ExamSchema.safeParse(parsedResponse);
    if (!validationResult.success) {
      console.error("Błąd walidacji:", validationResult.error);
      return {
        success: false,
        error: `Nieprawidłowa struktura odpowiedzi: ${validationResult.error.message}`,
      };
    }

    // 10. Dodaj informacje o trybie i węzłach
    const exam: ExamType = {
      ...validationResult.data,
      mode,
      nodeIds: selectedIds,
    };

    return {
      success: true,
      exam,
    };
  } catch (error) {
    console.error("Błąd generowania egzaminu:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Wystąpił nieoczekiwany błąd podczas generowania egzaminu.",
    };
  }
}
