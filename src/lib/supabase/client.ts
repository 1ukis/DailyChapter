import { createBrowserClient } from "@supabase/ssr";
import {
  assertSupabaseEnv,
  logSupabaseEnvStatus,
} from "@/lib/supabase/env";
import type { Database } from "@/types/database";

let loggedClientStatus = false;

export function createClient() {
  if (!loggedClientStatus && typeof window !== "undefined") {
    logSupabaseEnvStatus("client");
    loggedClientStatus = true;
  }

  try {
    const { url, anonKey } = assertSupabaseEnv();
    return createBrowserClient<Database>(url, anonKey);
  } catch (error) {
    console.error(
      "[DailyChapter] Failed to initialize Supabase browser client:",
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
}
