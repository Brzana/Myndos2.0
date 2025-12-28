import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthButtons from "@/components/AuthButtons";

// Mock Supabase client
vi.mock("@/lib/supabase/client", () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithOAuth: vi.fn(),
    },
  })),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  })),
}));

describe("AuthButtons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render welcome message and login buttons", () => {
    render(<AuthButtons />);

    expect(screen.getByText("Witaj w Myndos")).toBeInTheDocument();
    expect(
      screen.getByText("Zaloguj się, aby rozpocząć naukę")
    ).toBeInTheDocument();
    expect(screen.getByText("Zaloguj przez Google")).toBeInTheDocument();
    expect(screen.getByText("Zaloguj przez Outlook")).toBeInTheDocument();
  });

  it("should call signInWithOAuth with google provider when Google button is clicked", async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const mockSignIn = vi.fn().mockResolvedValue({ error: null });
    const mockClient = {
      auth: {
        signInWithOAuth: mockSignIn,
      },
    };
    vi.mocked(createClient).mockReturnValue(
      mockClient as unknown as ReturnType<typeof createClient>
    );

    render(<AuthButtons />);

    const googleButton = screen.getByText("Zaloguj przez Google");
    await userEvent.click(googleButton);

    expect(mockSignIn).toHaveBeenCalledWith({
      provider: "google",
      options: {
        redirectTo: expect.stringContaining("/auth/callback"),
      },
    });
  });

  it("should call signInWithOAuth with azure provider when Outlook button is clicked", async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const mockSignIn = vi.fn().mockResolvedValue({ error: null });
    const mockClient = {
      auth: {
        signInWithOAuth: mockSignIn,
      },
    };
    vi.mocked(createClient).mockReturnValue(
      mockClient as unknown as ReturnType<typeof createClient>
    );

    render(<AuthButtons />);

    const outlookButton = screen.getByText("Zaloguj przez Outlook");
    await userEvent.click(outlookButton);

    expect(mockSignIn).toHaveBeenCalledWith({
      provider: "azure",
      options: {
        redirectTo: expect.stringContaining("/auth/callback"),
      },
    });
  });

  it("should handle sign in errors gracefully", async () => {
    const { createClient } = await import("@/lib/supabase/client");
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const mockError = { message: "Authentication failed" };
    const mockSignIn = vi.fn().mockResolvedValue({ error: mockError });
    const mockClient = {
      auth: {
        signInWithOAuth: mockSignIn,
      },
    };
    vi.mocked(createClient).mockReturnValue(
      mockClient as unknown as ReturnType<typeof createClient>
    );

    render(<AuthButtons />);

    const googleButton = screen.getByText("Zaloguj przez Google");
    await userEvent.click(googleButton);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error signing in:",
      mockError
    );
    consoleErrorSpy.mockRestore();
  });
});
