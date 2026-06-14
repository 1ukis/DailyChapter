import type { Log } from "@/types/database";
import {
  addDaysToDateString,
  CONTRIBUTION_DAYS,
  formatDateShort,
  getIsoDayOfWeek,
  getRollingYearRange,
  getTodayInTimezone,
} from "@/lib/utils/date";

export type CalendarDensity = 0 | 1 | 2 | 3;

export interface CalendarCell {
  date: string;
  inRange: boolean;
  pages: number;
  target: number;
  density: CalendarDensity;
  isToday: boolean;
  label: string;
}

export interface CalendarMonthLabel {
  label: string;
  column: number;
}

const WEEKS = 53;

export function buildContributionCalendar(
  logs: Log[],
  timezone: string,
): { cells: CalendarCell[]; monthLabels: CalendarMonthLabel[] } {
  const { start, end } = getRollingYearRange(timezone);
  const today = getTodayInTimezone(timezone);
  const logMap = new Map(logs.map((log) => [log.log_date, log]));

  let gridStart = start;
  while (getIsoDayOfWeek(gridStart) !== 1) {
    gridStart = addDaysToDateString(gridStart, -1);
  }

  const cells: CalendarCell[] = [];
  let cursor = gridStart;

  for (let i = 0; i < WEEKS * 7; i++) {
    const inRange = cursor >= start && cursor <= end;
    const log = logMap.get(cursor);
    const pages = inRange ? (log?.pages ?? 0) : 0;
    const target = inRange ? (log?.target_pages ?? 30) : 0;

    let density: CalendarDensity = 0;
    if (inRange && pages > 0) {
      if (pages >= target) density = 3;
      else if (pages >= Math.round(target / 2)) density = 2;
      else density = 1;
    }

    cells.push({
      date: cursor,
      inRange,
      pages,
      target,
      density,
      isToday: cursor === today,
      label: inRange
        ? `${formatDateShort(cursor, timezone)}: ${pages} pages (goal: ${target})`
        : "",
    });

    cursor = addDaysToDateString(cursor, 1);
  }

  const monthLabels: CalendarMonthLabel[] = [];
  let lastMonth = -1;

  for (let week = 0; week < WEEKS; week++) {
    const weekDate = addDaysToDateString(gridStart, week * 7);
    const month = new Date(`${weekDate}T12:00:00`).getMonth();

    if (month !== lastMonth && weekDate <= end) {
      monthLabels.push({
        label: new Date(`${weekDate}T12:00:00`).toLocaleString("en-US", {
          month: "short",
          timeZone: timezone,
        }),
        column: week,
      });
      lastMonth = month;
    }
  }

  return { cells, monthLabels };
}

export const DENSITY_CLASSES: Record<CalendarDensity, string> = {
  0: "bg-white/[0.04] border border-white/[0.02]",
  1: "bg-rose-500/25",
  2: "bg-rose-500/55",
  3: "bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.4)]",
};

export { CONTRIBUTION_DAYS };
