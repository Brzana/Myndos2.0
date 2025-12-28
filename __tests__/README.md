# Testy - Myndos

## Struktura testów

- `__tests__/` - Testy jednostkowe i integracyjne (Vitest)
- `e2e/` - Testy end-to-end (Playwright)

## Uruchamianie testów

### Testy jednostkowe (Vitest)

```bash
# Uruchom wszystkie testy jednostkowe
npm run test

# Uruchom testy w trybie watch (automatyczne uruchamianie przy zmianach)
npm run test -- --watch

# Uruchom testy z interfejsem UI
npm run test:ui
```

### Testy E2E (Playwright)

```bash
# Uruchom wszystkie testy E2E
npm run test:e2e

# Uruchom testy E2E z interfejsem UI
npm run test:e2e:ui

# Uruchom testy E2E w trybie debug
npx playwright test --debug
```

**Uwaga:** Testy E2E automatycznie uruchamiają serwer deweloperski (`npm run dev`) przed rozpoczęciem testów.

## Wymagania

- Node.js 18+
- Zainstalowane zależności (`npm install`)
- Dla testów E2E: Playwright przeglądarki (`npx playwright install`)

## Konfiguracja

### Zmienne środowiskowe dla testów

Testy używają mockowanych klientów Supabase, więc nie wymagają rzeczywistych zmiennych środowiskowych. Jednak dla testów E2E, które mogą wymagać rzeczywistego połączenia, upewnij się, że masz skonfigurowane:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Pokrycie testami

Aktualnie zaimplementowane testy:

### Testy jednostkowe

- `AuthButtons` - Komponent przycisków logowania

### Testy E2E

- Przepływ logowania (wyświetlanie przycisków)
- Callback OAuth
- Przekierowania

## Dodawanie nowych testów

### Test jednostkowy (Vitest)

```typescript
import { describe, it, expect } from "vitest";

describe("MyComponent", () => {
  it("should do something", () => {
    expect(true).toBe(true);
  });
});
```

### Test E2E (Playwright)

```typescript
import { test, expect } from "@playwright/test";

test("should do something", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Hello")).toBeVisible();
});
```
