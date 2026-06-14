import { createClient } from "@/lib/supabase/server";
import {
  isSupabaseConfigured,
  logSupabaseEnvStatus,
} from "@/lib/supabase/env";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  logSupabaseEnvStatus("runtime");

  if (!isSupabaseConfigured()) {
    console.error("[DailyChapter] OAuth callback: Supabase env missing");
    return NextResponse.redirect(
      `${origin}/login?error=supabase_not_configured`,
    );
  }

  if (!code) {
    console.error("[DailyChapter] OAuth callback: missing auth code");
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error(
        "[DailyChapter] OAuth callback: session exchange failed:",
        error.message,
      );
      return NextResponse.redirect(
        `${origin}/login?error=auth_callback_failed`,
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("setup_completed")
      .single();

    const destination = profile?.setup_completed ? next : "/setup";
    return NextResponse.redirect(`${origin}${destination}`);
  } catch (error) {
    console.error(
      "[DailyChapter] OAuth callback: unexpected error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }
}
