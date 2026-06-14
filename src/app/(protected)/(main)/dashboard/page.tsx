"use client";

import { useBooks } from "@/hooks/use-books";
import { useProfile } from "@/hooks/use-profile";

export default function DashboardPage() {
  const { data: profile } = useProfile();
  const { data: books = [], isLoading } = useBooks();

  const completed = books.filter((b) => b.completed_at).length;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Welcome back</p>
          <h1 className="font-display text-3xl font-bold">
            {profile?.display_name ?? "Reader"}
          </h1>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-muted">Books in curriculum</p>
          <p className="font-display mt-1 text-3xl font-bold">
            {isLoading ? "—" : books.length}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-muted">Completed</p>
          <p className="font-display mt-1 text-3xl font-bold">
            {isLoading ? "—" : completed}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-muted">Daily goal</p>
          <p className="font-display mt-1 text-3xl font-bold">
            {profile?.base_goal ?? 30} pages
          </p>
        </div>
      </div>

      <p className="mt-8 text-muted">
        Full curriculum dashboard UI arrives in Phase 3. Your books are synced
        from Supabase.
      </p>
    </main>
  );
}
