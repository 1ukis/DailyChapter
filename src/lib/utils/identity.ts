import type { Log } from "@/types/database";
import type { ReadingIdentityLevel } from "@/types/database";

export function resolveIdentityLevel(
  levels: ReadingIdentityLevel[],
  currentStreak: number,
  totalPages: number,
): ReadingIdentityLevel | null {
  if (levels.length === 0) return null;

  const sorted = [...levels].sort((a, b) => b.sort_order - a.sort_order);

  for (const level of sorted) {
    if (
      currentStreak >= level.min_streak &&
      totalPages >= level.min_total_pages
    ) {
      return level;
    }
  }

  return [...levels].sort((a, b) => a.sort_order - b.sort_order)[0] ?? null;
}
