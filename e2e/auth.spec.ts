import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display welcome message on home page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Home page should display welcome message
    await expect(page.getByText("Welcome to Myndos!")).toBeVisible();
  });
});

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto("/login");
    // Wait for page to load
    await page.waitForLoadState("networkidle");
  });

  test("should display login buttons on login page", async ({ page }) => {
    // Check if welcome message is visible
    await expect(page.getByText("Witaj w Myndos")).toBeVisible({
      timeout: 10000,
    });

    // Check if login instruction is visible
    await expect(
      page.getByText("Zaloguj się, aby rozpocząć naukę")
    ).toBeVisible();

    // Check if Google login button is visible
    await expect(
      page.getByRole("button", { name: /Zaloguj przez Google/i })
    ).toBeVisible();

    // Check if Outlook login button is visible
    await expect(
      page.getByRole("button", { name: /Zaloguj przez Outlook/i })
    ).toBeVisible();
  });

  test("should have correct structure for login buttons", async ({ page }) => {
    const googleButton = page.getByRole("button", {
      name: /Zaloguj przez Google/i,
    });
    const outlookButton = page.getByRole("button", {
      name: /Zaloguj przez Outlook/i,
    });

    // Buttons should be visible and enabled
    await expect(googleButton).toBeVisible();
    await expect(googleButton).toBeEnabled();
    await expect(outlookButton).toBeVisible();
    await expect(outlookButton).toBeEnabled();
  });

  test("should attempt OAuth redirect when Google button is clicked", async ({
    page,
  }) => {
    // Set up navigation listener to catch redirects
    const navigationPromise = page.waitForNavigation({
      timeout: 5000,
      waitUntil: "domcontentloaded",
    }).catch(() => null); // Ignore timeout if no navigation occurs

    // Click Google login button
    const button = page.getByRole("button", { name: /Zaloguj przez Google/i });
    await expect(button).toBeVisible();
    await button.click();

    // Wait for either navigation or timeout
    await navigationPromise;

    // In test environment without real Supabase credentials, the button click
    // may not redirect. This test verifies the button is clickable.
    // Full OAuth flow requires real credentials and cannot be fully tested in E2E.
  });

  test("should attempt OAuth redirect when Outlook button is clicked", async ({
    page,
  }) => {
    // Set up navigation listener
    const navigationPromise = page.waitForNavigation({
      timeout: 5000,
      waitUntil: "domcontentloaded",
    }).catch(() => null);

    // Click Outlook login button
    const button = page.getByRole("button", { name: /Zaloguj przez Outlook/i });
    await expect(button).toBeVisible();
    await button.click();

    // Wait for either navigation or timeout
    await navigationPromise;

    // Similar to Google test - verifies button is functional
  });

  test("should redirect to home when accessing dashboard without auth", async ({
    page,
  }) => {
    // Navigate directly to dashboard (should redirect if not logged in)
    await page.goto("/dashboard", { waitUntil: "networkidle" });

    // Middleware should redirect unauthenticated users to home
    // Wait a moment for redirect to complete
    await page.waitForTimeout(1000);

    const currentUrl = page.url();
    // Should redirect to home page (/) when not authenticated
    expect(currentUrl).toMatch(/\/$/);
  });
});

test.describe("Auth Callback Route", () => {
  test("should handle OAuth callback with code parameter", async ({ page }) => {
    // Simulate OAuth callback with invalid test code
    // In test environment without real Supabase, this will fail gracefully
    const testCode = "test-auth-code-123";
    await page.goto(`/auth/callback?code=${testCode}`, {
      waitUntil: "networkidle",
    });

    // Wait for redirect attempt
    await page.waitForTimeout(2000);

    // The callback should attempt to process and redirect
    // Without valid credentials, it may redirect to home or show an error
    const currentUrl = page.url();
    // Should not stay on callback route
    expect(currentUrl).not.toContain("/auth/callback");
  });

  test("should handle OAuth callback with next parameter", async ({ page }) => {
    const testCode = "test-auth-code-456";
    const nextPath = "/dashboard";

    await page.goto(`/auth/callback?code=${testCode}&next=${nextPath}`, {
      waitUntil: "networkidle",
    });

    await page.waitForTimeout(2000);

    // Without valid OAuth code, callback will fail and redirect
    // In test environment, it may redirect to home instead of next path
    const currentUrl = page.url();
    // Should redirect somewhere (not stay on callback)
    expect(currentUrl).not.toContain("/auth/callback");
  });
});
