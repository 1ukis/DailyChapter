import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { assertSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export async function createClient() {
  try {
    const { url, anonKey } = assertSupabaseEnv();
    const cookieStore = await cookies();

    return createServerClient<Database>(url, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component — safe to ignore when middleware
            // handles session refresh.
          }
        },
      },
    });
  } catch (error) {
    console.error(
      "[DailyChapter] Failed to initialize Supabase server client:",
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}
