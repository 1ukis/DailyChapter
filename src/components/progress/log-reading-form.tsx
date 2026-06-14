"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useBooks } from "@/hooks/use-books";
import { useUpsertLog } from "@/hooks/use-logs";
import { useProfile } from "@/hooks/use-profile";
import { getTodayInTimezone } from "@/lib/utils/date";
import {
  calculateDynamicTarget,
  LOG_DIFFICULTY_OPTIONS,
} from "@/lib/utils/reading-target";
import type { Log, LogDifficulty, Profile } from "@/types/database";
import { useState } from "react";

interface LogReadingFormProps {
  timezone: string;
  profile: Profile;
  todayLog?: Log;
  onLogged: (metGoal: boolean) => void;
}

function LogReadingFormInner({
  timezone,
  profile,
  todayLog,
  onLogged,
}: LogReadingFormProps) {
  const { data: books = [] } = useBooks();
  const upsertLog = useUpsertLog(timezone);

  const curriculumBooks = books.filter((b) => !b.is_companion);

  const defaultBookId =
    todayLog?.book_id ??
    profile.selected_book_id ??
    curriculumBooks[0]?.id ??
    "";

  const [bookId, setBookId] = useState(defaultBookId);
  const [difficulty, setDifficulty] = useState<LogDifficulty>(
    todayLog?.difficulty ?? profile.default_log_difficulty,
  );
  const [baseGoal, setBaseGoal] = useState(
    String(profile.base_goal),
  );
  const [pages, setPages] = useState(
    todayLog ? String(todayLog.pages) : "",
  );
  const [feedback, setFeedback] = useState<{
    type: "success" | "info";
    message: string;
    emoji: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const target = calculateDynamicTarget(Number(baseGoal) || 30, difficulty);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setFeedback(null);

    const pagesVal = Number(pages);
    if (Number.isNaN(pagesVal) || pagesVal < 0) {
      setError("Please enter a valid page count.");
      return;
    }

    try {
      const result = await upsertLog.mutateAsync({
        log_date: getTodayInTimezone(timezone),
        pages: pagesVal,
        target_pages: target,
        difficulty,
        book_id: bookId || null,
        base_goal: Number(baseGoal) || 30,
        default_log_difficulty: difficulty,
        selected_book_id: bookId || null,
      });

      if (result.metGoal) {
        setFeedback({
          type: "success",
          message: `Sensational! You completed ${pagesVal} pages and hit your daily target of ${target} pages.`,
          emoji: "🔥",
        });
      } else {
        setFeedback({
          type: "info",
          message: `Great effort logging ${pagesVal} pages today! Every page counts toward your reading habit.`,
          emoji: "🌱",
        });
      }

      onLogged(result.metGoal);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log reading.");
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6">
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold">Log Today&apos;s Reading</h2>
        <p className="mt-1 text-sm text-muted">
          Record your daily pages and build your reading identity.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <Alert variant="error">{error}</Alert>}

        <div>
          <Label htmlFor="book">Select book</Label>
          <Select
            id="book"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          >
            {curriculumBooks.length === 0 && (
              <option value="">No books in curriculum</option>
            )}
            {curriculumBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
                {book.month ? ` (Month ${book.month})` : ""}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="difficulty">Session difficulty</Label>
            <Select
              id="difficulty"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as LogDifficulty)
              }
            >
              {LOG_DIFFICULTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} (target:{" "}
                  {calculateDynamicTarget(Number(baseGoal) || 30, opt.value)}{" "}
                  pages)
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="baseGoal">Base daily goal</Label>
            <Input
              id="baseGoal"
              type="number"
              min={1}
              value={baseGoal}
              onChange={(e) => setBaseGoal(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pages">Pages read today</Label>
            <Input
              id="pages"
              type="number"
              min={0}
              max={500}
              placeholder="e.g. 25"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              Today&apos;s target
            </span>
            <span className="font-display text-3xl font-bold text-accent">
              {target}
            </span>
            <span className="text-xs text-muted">pages</span>
          </div>
        </div>

        <Button type="submit" className="w-full" loading={upsertLog.isPending}>
          Log daily reading
        </Button>
      </form>

      {feedback && (
        <div
          className={`mt-4 flex items-start gap-3 rounded-xl border p-4 ${
            feedback.type === "success"
              ? "border-success/30 bg-success/10"
              : "border-white/10 bg-white/[0.03]"
          }`}
        >
          <span className="text-2xl">{feedback.emoji}</span>
          <p className="text-sm leading-relaxed">{feedback.message}</p>
        </div>
      )}
    </div>
  );
}

export function LogReadingForm({
  timezone,
  todayLog,
  onLogged,
}: Omit<LogReadingFormProps, "profile"> & { profile?: Profile | null }) {
  const { data: profile, isLoading } = useProfile();

  if (isLoading || !profile) {
    return (
      <div className="rounded-2xl border border-white/10 bg-card p-6">
        <p className="text-sm text-muted">Loading form...</p>
      </div>
    );
  }

  const formKey = `${profile.updated_at}-${todayLog?.updated_at ?? "new"}`;

  return (
    <LogReadingFormInner
      key={formKey}
      timezone={timezone}
      profile={profile}
      todayLog={todayLog}
      onLogged={onLogged}
    />
  );
}
