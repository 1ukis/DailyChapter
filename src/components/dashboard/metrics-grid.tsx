import type { DashboardMetrics } from "@/lib/utils/curriculum";
import { formatDateForDisplay, getTodayInTimezone } from "@/lib/utils/date";

interface MetricsGridProps {
  metrics: DashboardMetrics;
  timezone: string;
  displayName?: string | null;
}

export function MetricsGrid({
  metrics,
  timezone,
  displayName,
}: MetricsGridProps) {
  const today = formatDateForDisplay(getTodayInTimezone(timezone), timezone);

  return (
    <header className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
            Curriculum Dashboard
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {displayName ? `${displayName}'s Reading Plan` : "Your Reading Plan"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Track your curriculum progress, complete books, and build daily
            reading habits.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-card px-4 py-3 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Today
          </p>
          <p className="font-display text-sm font-semibold">{today}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">Curriculum Progress</p>
            <p className="font-display text-2xl font-bold">
              {metrics.progressPercent}%
            </p>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-gold transition-all duration-500"
              style={{ width: `${metrics.progressPercent}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-muted">
            <span>
              <strong className="text-foreground">
                {metrics.completedBooks}
              </strong>{" "}
              / {metrics.totalBooks} books
            </span>
            <span>
              <strong className="text-foreground">
                {metrics.completedPages.toLocaleString()}
              </strong>{" "}
              / {metrics.totalPages.toLocaleString()} pages
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-sm text-muted">Active Focus</p>
          <p className="font-display mt-1 text-2xl font-bold">
            {metrics.activeMonth ? `Month ${metrics.activeMonth}` : "—"}
          </p>
          <p className="mt-1 text-sm text-foreground">
            {metrics.activeMonthLabel}
          </p>
        </div>
      </div>
    </header>
  );
}
