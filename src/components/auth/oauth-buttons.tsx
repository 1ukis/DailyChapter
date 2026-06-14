"use client";

import { Button } from "@/components/ui/button";
import { signInWithOAuth } from "@/lib/auth/oauth";
import { useState } from "react";

export function OAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  async function handleOAuth(provider: "google" | "github") {
    setLoadingProvider(provider);
    setError(null);
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "OAuth sign-in failed. Try again.",
      );
      setLoadingProvider(null);
    }
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        loading={loadingProvider === "google"}
        onClick={() => handleOAuth("google")}
      >
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
        loading={loadingProvider === "github"}
        onClick={() => handleOAuth("github")}
      >
        Continue with GitHub
      </Button>
      {error && <p className="text-center text-sm text-red-400">{error}</p>}
    </div>
  );
}
