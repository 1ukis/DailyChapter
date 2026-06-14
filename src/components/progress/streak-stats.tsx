"use client";

import { resolveIdentityLevel } from "@/lib/utils/identity";
import { computeTotalPages } from "@/lib/utils/streaks";
import type { Log, ReadingIdentityLevel } from "@/types/database";

interface StreakStatsProps {
  currentStreak: number;
  longestStreak: number;
  logs: Log[];
  identityLevels: ReadingIdentityLevel[];
}

export function StreakStats({
  currentStreak,
  longestStreak,
  logs,
  identityLevels,
}: StreakStatsProps) {
  const totalPages = computeTotalPages(logs);
  const identity = resolveIdentityLevel(
    identityLevels,
    currentStreak,
    totalPages,
  );

  return (
    <div className="mt-6 grid gap-3 border-t border-white/5 pt-6 sm:grid-cols-3">
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          Current streak
        </p>
        <p className="font-display mt-1 text-3xl font-bold text-rose-400">
          {currentStreak}
        </p>
        <p className="text-xs text-muted">days</p>
      </div>

      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          Longest streak
        </p>
        <p className="font-display mt-1 text-3xl font-bold text-accent">
          {longestStreak}
        </p>
        <p className="text-xs text-muted">days</p>
      </div>

      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center sm:col-span-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          Reading identity
        </p>
        <p className="mt-1 text-sm font-semibold text-amber-400">
          {identity?.name ?? "Reader"}
        </p>
        <p className="text-xs text-muted">
          {identity?.description ?? "Keep reading daily"}
        </p>
      </div>
    </div>
  );
}
