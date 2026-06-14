import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-8">
        <h1 className="font-display text-2xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-muted">
          Auth UI (email, Google, GitHub) arrives in Phase 2.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-accent hover:underline"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
