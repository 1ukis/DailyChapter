"use client";

import { computeConsistencyRate, computeTotalPages } from "@/lib/utils/streaks";
import type { Log } from "@/types/database";

interface ConsistencyChartProps {
  logs: Log[];
  timezone: string;
}

export function ConsistencyChart({ logs, timezone }: ConsistencyChartProps) {
  const totalPages = computeTotalPages(logs);
  const consistency = computeConsistencyRate(logs, timezone);

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted">
          Total:{" "}
          <strong className="text-foreground">
            {totalPages.toLocaleString()}
          </strong>{" "}
          pages logged
        </span>
        <span className="text-muted">
          Consistency:{" "}
          <strong className="text-accent">{consistency}%</strong>
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-rose-500 transition-all duration-500"
          style={{ width: `${consistency}%` }}
        />
      </div>
    </div>
  );
}
