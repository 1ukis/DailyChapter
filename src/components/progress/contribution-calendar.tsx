"use client";

import {
  buildContributionCalendar,
  DENSITY_CLASSES,
} from "@/lib/utils/contribution-calendar";
import type { Log } from "@/types/database";

interface ContributionCalendarProps {
  logs: Log[];
  timezone: string;
}

export function ContributionCalendar({
  logs,
  timezone,
}: ContributionCalendarProps) {
  const { cells, monthLabels } = buildContributionCalendar(logs, timezone);

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold">
            Reading Contribution Graph
          </h2>
          <p className="mt-1 text-sm text-muted">
            Your reading volume over the last 365 days.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>Less</span>
          {([0, 1, 2, 3] as const).map((d) => (
            <div
              key={d}
              className={`h-2.5 w-2.5 rounded-sm ${DENSITY_CLASSES[d]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/20 p-4">
        <div
          className="mb-1.5 grid text-[10px] font-semibold text-muted"
          style={{
            gridTemplateColumns: `28px repeat(53, 11px)`,
            gap: "3px",
          }}
        >
          <div />
          {Array.from({ length: 53 }, (_, week) => {
            const label = monthLabels.find((m) => m.column === week);
            return (
              <div key={week} className="truncate">
                {label?.label ?? ""}
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <div className="flex w-7 flex-col justify-between py-0.5 text-[10px] font-semibold text-muted">
            <span>Mon</span>
            <span />
            <span>Wed</span>
            <span />
            <span>Fri</span>
            <span />
            <span />
          </div>

          <div
            className="grid gap-[3px]"
            style={{
              gridTemplateRows: "repeat(7, 10px)",
              gridTemplateColumns: "repeat(53, 10px)",
              gridAutoFlow: "column",
            }}
          >
            {cells.map((cell) => (
              <div
                key={cell.date}
                title={cell.inRange ? cell.label : undefined}
                className={`rounded-sm transition ${
                  cell.inRange
                    ? DENSITY_CLASSES[cell.density]
                    : "bg-transparent opacity-20"
                } ${cell.isToday ? "ring-1 ring-rose-400 ring-offset-1 ring-offset-background" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
