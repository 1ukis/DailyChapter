/**
 * Returns today's date as YYYY-MM-DD in the given IANA timezone.
 * In development, set NEXT_PUBLIC_MOCK_DATE=YYYY-MM-DD to override.
 */
export function getTodayInTimezone(timezone: string, now = new Date()): string {
  const mockDate = process.env.NEXT_PUBLIC_MOCK_DATE;
  if (process.env.NODE_ENV === "development" && mockDate) {
    return mockDate;
  }

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function detectBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "America/Toronto";
  }
}

export function formatDateForDisplay(
  dateStr: string,
  timezone: string,
): string {
  const date = new Date(`${dateStr}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/** Number of days in the contribution heatmap (rolling 365-day window). */
export const CONTRIBUTION_DAYS = 365;
