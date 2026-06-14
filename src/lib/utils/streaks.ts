import type { Log } from "@/types/database";
import {
  addDaysToDateString,
  getTodayInTimezone,
} from "@/lib/utils/date";

function metGoal(log: Log | undefined): boolean {
  if (!log) return false;
  return log.pages >= log.target_pages;
}

function computeLongestStreak(logs: Log[]): number {
  if (logs.length === 0) return 0;

  const sorted = [...logs].sort((a, b) =>
    a.log_date.localeCompare(b.log_date),
  );

  let longest = 0;
  let current = 0;
  let prevDate: string | null = null;

  for (const log of sorted) {
    if (!metGoal(log)) {
      current = 0;
      prevDate = null;
      continue;
    }

    if (prevDate && addDaysToDateString(prevDate, 1) === log.log_date) {
      current++;
    } else {
      current = 1;
    }

    longest = Math.max(longest, current);
    prevDate = log.log_date;
  }

  return longest;
}

export function calculateStreaks(
  logs: Log[],
  timezone: string,
  todayOverride?: string,
): { currentStreak: number; longestStreak: number } {
  const today = todayOverride ?? getTodayInTimezone(timezone);
  const yesterday = addDaysToDateString(today, -1);
  const byDate = new Map(logs.map((log) => [log.log_date, log]));

  const todayMet = metGoal(byDate.get(today));
  const yesterdayMet = metGoal(byDate.get(yesterday));

  let currentStreak = 0;

  if (!todayMet && !yesterdayMet) {
    currentStreak = 0;
  } else {
    let cursor = todayMet ? today : yesterday;
    while (metGoal(byDate.get(cursor))) {
      currentStreak++;
      cursor = addDaysToDateString(cursor, -1);
    }
  }

  const longestStreak = Math.max(computeLongestStreak(logs), currentStreak);

  return { currentStreak, longestStreak };
}

export function computeTotalPages(logs: Log[]): number {
  return logs.reduce((sum, log) => sum + log.pages, 0);
}

export function computeConsistencyRate(
  logs: Log[],
  timezone: string,
): number {
  const today = getTodayInTimezone(timezone);
  const start = addDaysToDateString(today, -364);
  const startDate = parseDate(start);
  const todayDate = parseDate(today);
  const elapsedDays =
    Math.floor(
      (todayDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    ) + 1;

  const qualifyingDays = logs.filter(
    (log) => log.log_date >= start && log.log_date <= today && metGoal(log),
  ).length;

  return elapsedDays > 0
    ? Math.round((qualifyingDays / elapsedDays) * 100)
    : 0;
}

function parseDate(dateStr: string): Date {
  return new Date(`${dateStr}T12:00:00`);
}
