"use client";

import type { DashboardView } from "@/lib/utils/curriculum";

interface ViewToggleProps {
  view: DashboardView;
  onChange: (view: DashboardView) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-xl border border-white/10 bg-card p-1">
      <button
        type="button"
        onClick={() => onChange("timeline")}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
          view === "timeline"
            ? "bg-white/10 text-foreground"
            : "text-muted hover:text-foreground"
        }`}
      >
        Timeline Order
      </button>
      <button
        type="button"
        onClick={() => onChange("theme")}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
          view === "theme"
            ? "bg-white/10 text-foreground"
            : "text-muted hover:text-foreground"
        }`}
      >
        Themes & Topics
      </button>
    </div>
  );
}
