import { createClient } from "@/lib/supabase/client";

function getRedirectUrl(path = "/auth/callback") {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin;
  return `${appUrl}${path}`;
}

export async function signInWithOAuth(provider: "google" | "github") {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getRedirectUrl()}`,
      queryParams: provider === "google" ? { prompt: "select_account" } : undefined,
    },
  });

  if (error) throw error;
}
