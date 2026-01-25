import OpenAI from "openai";

/**
 * Tworzy klienta OpenAI z API key z zmiennych środowiskowych.
 * Wymaga ustawienia OPENAI_API_KEY w .env.local
 */
export function createOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY nie jest ustawione w zmiennych środowiskowych"
    );
  }

  return new OpenAI({
    apiKey,
  });
}
