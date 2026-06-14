import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/**
 * OAuth callback URL. Uses the live browser origin so Vercel preview
 * and production deployments work without changing env per deployment.
 */
export function getAuthCallbackUrl(next = "/dashboard"): string {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

  if (!origin) {
    throw new Error(
      "Cannot determine OAuth callback URL. Set NEXT_PUBLIC_APP_URL for server-side use.",
    );
  }

  const params = new URLSearchParams({ next });
  return `${origin}/auth/callback?${params.toString()}`;
}

export async function signInWithOAuth(provider: "google" | "github") {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  const supabase = createClient();
  const redirectTo = getAuthCallbackUrl("/dashboard");

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      queryParams:
        provider === "google" ? { prompt: "select_account" } : undefined,
    },
  });

  if (error) {
    console.error(
      `[DailyChapter] OAuth sign-in failed (${provider}):`,
      error.message,
    );
    throw error;
  }
}
