"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (provider: "google" | "azure") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in:", error);
      // TODO: Add error handling/toast notification
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Witaj w Myndos</h1>
      <p className="text-lg text-text-muted mb-8">
        Zaloguj się, aby rozpocząć naukę
      </p>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          onClick={() => handleSignIn("google")}
          className="px-6 py-3 bg-white text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Zaloguj przez Google
        </button>
        <button
          onClick={() => handleSignIn("azure")}
          className="px-6 py-3 bg-white text-gray-800 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0078D4">
            <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z" />
          </svg>
          Zaloguj przez Outlook
        </button>
      </div>
    </div>
  );
}
