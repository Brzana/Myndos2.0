import { z } from "zod";

/**
 * Schematy Zod do walidacji odpowiedzi JSON z LLM (Funkcja 4, requirements.md)
 */

/** Schemat dla pojedynczego pytania ABCD */
export const ExamQuestionSchema = z.object({
  question: z.string().min(10, "Pytanie musi mieć co najmniej 10 znaków"),
  options: z
    .tuple([z.string(), z.string(), z.string(), z.string()])
    .refine(
      (options) => options.every((opt) => opt.length > 0),
      "Wszystkie opcje muszą być wypełnione"
    ),
  correctAnswer: z.enum(["A", "B", "C", "D"], {
    errorMap: () => ({ message: "Poprawna odpowiedź musi być A, B, C lub D" }),
  }),
  nodeId: z.string().optional(),
});

/** Schemat dla całego egzaminu */
export const ExamSchema = z.object({
  questions: z
    .array(ExamQuestionSchema)
    .min(1, "Egzamin musi zawierać co najmniej 1 pytanie")
    .max(10, "Egzamin może zawierać maksymalnie 10 pytań (MVP limit)"),
  mode: z.enum(["poznawanie", "slabe_obszary", "pelny_material"]).optional(),
  nodeIds: z.array(z.string()).optional(),
});

/** Typ TypeScript wywnioskowany ze schematu */
export type ExamQuestionType = z.infer<typeof ExamQuestionSchema>;
export type ExamType = z.infer<typeof ExamSchema>;
