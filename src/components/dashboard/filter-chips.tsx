"use client";

interface FilterChipsProps {
  options: { value: string; label: string }[];
  activeFilter: string;
  onChange: (value: string) => void;
}

export function FilterChips({
  options,
  activeFilter,
  onChange,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          activeFilter === "all"
            ? "border-accent bg-accent/15 text-accent"
            : "border-white/10 text-muted hover:border-white/20 hover:text-foreground"
        }`}
      >
        Show All
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            activeFilter === option.value
              ? "border-accent bg-accent/15 text-accent"
              : "border-white/10 text-muted hover:border-white/20 hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
