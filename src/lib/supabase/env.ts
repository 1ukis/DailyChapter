export type EnvValidationResult = {
  valid: boolean;
  missing: string[];
  invalid: string[];
  urlHost?: string;
};

const PLACEHOLDER_PATTERNS = [
  "your-project",
  "your-anon-key",
  "paste-your",
  "example.com",
];

function isPlaceholder(value: string): boolean {
  const lower = value.toLowerCase();
  return PLACEHOLDER_PATTERNS.some((pattern) => lower.includes(pattern));
}

/**
 * Validates required Supabase public environment variables.
 * Safe to call on server, edge, and during `next build`.
 */
export function validateSupabaseEnv(): EnvValidationResult {
  const missing: string[] = [];
  const invalid: string[] = [];

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  if (!rawUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!rawKey) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  let urlHost: string | undefined;

  if (rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      if (!parsed.hostname.endsWith(".supabase.co")) {
        invalid.push("NEXT_PUBLIC_SUPABASE_URL (expected *.supabase.co host)");
      } else {
        urlHost = parsed.host;
      }
    } catch {
      invalid.push("NEXT_PUBLIC_SUPABASE_URL (invalid URL format)");
    }

    if (isPlaceholder(rawUrl)) {
      invalid.push("NEXT_PUBLIC_SUPABASE_URL (still using placeholder value)");
    }
  }

  if (rawKey && isPlaceholder(rawKey)) {
    invalid.push("NEXT_PUBLIC_SUPABASE_ANON_KEY (still using placeholder value)");
  }

  if (rawKey && rawKey.length < 20) {
    invalid.push("NEXT_PUBLIC_SUPABASE_ANON_KEY (value looks too short)");
  }

  return {
    valid: missing.length === 0 && invalid.length === 0,
    missing,
    invalid,
    urlHost,
  };
}

export function isSupabaseConfigured(): boolean {
  return validateSupabaseEnv().valid;
}

/**
 * Returns Supabase credentials or null when not configured.
 */
export function getSupabaseEnv(): { url: string; anonKey: string } | null {
  const result = validateSupabaseEnv();
  if (!result.valid) return null;

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim(),
  };
}

/**
 * Returns Supabase credentials or throws with a clear error message.
 */
export function assertSupabaseEnv(): { url: string; anonKey: string } {
  const result = validateSupabaseEnv();

  if (!result.valid) {
    const problems = [...result.missing, ...result.invalid];
    throw new Error(
      `Supabase environment invalid. Fix: ${problems.join("; ")}`,
    );
  }

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim(),
  };
}

/**
 * Logs whether env vars are detected (never logs secret values).
 */
export function logSupabaseEnvStatus(
  context: "build" | "runtime" | "client" = "runtime",
): EnvValidationResult {
  const result = validateSupabaseEnv();
  const tag = `[DailyChapter env/${context}]`;

  if (result.valid) {
    console.log(
      `${tag} Supabase configured ✓ (host: ${result.urlHost}, anon key: detected)`,
    );
  } else {
    const problems = [...result.missing, ...result.invalid];
    console.warn(`${tag} Supabase NOT configured — ${problems.join(", ")}`);
  }

  return result;
}
