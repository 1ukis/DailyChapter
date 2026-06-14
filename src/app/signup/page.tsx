import { SignUpForm } from "@/components/auth/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card p-8">
        <h1 className="font-display text-2xl font-bold">Create account</h1>
        <p className="mt-2 text-sm text-muted">
          Start building your personal reading curriculum.
        </p>
        <div className="mt-6">
          <SignUpForm />
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
