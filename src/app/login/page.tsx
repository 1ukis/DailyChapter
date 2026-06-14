import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-8">
        <h1 className="font-display text-2xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Continue your reading journey.
        </p>
        <div className="mt-6">
          <Suspense fallback={<p className="text-sm text-muted">Loading...</p>}>
            <LoginForm />
          </Suspense>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-muted hover:text-foreground"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
