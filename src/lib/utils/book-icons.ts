export function getBookIconPath(iconName: string): string {
  const icons: Record<string, string> = {
    atom: `<circle cx="12" cy="12" r="3" stroke="#fff" stroke-width="1.5" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#fff" stroke-width="1.5" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#fff" stroke-width="1.5" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#fff" stroke-width="1.5" fill="none" transform="rotate(120 12 12)"/>`,
    pyramid: `<polygon points="12,4 20,18 4,18" stroke="#fff" stroke-width="1.5" fill="none"/><line x1="8" y1="14" x2="16" y2="14" stroke="#fff" stroke-width="1.5"/>`,
    scroll: `<path d="M16 2H7.5A2.5 2.5 0 0 0 5 4.5v13A2.5 2.5 0 0 0 7.5 20H18v-2h-2V2z" stroke="#fff" stroke-width="1.5" fill="none"/><line x1="8" y1="6" x2="13" y2="6" stroke="#fff" stroke-width="1.5" opacity="0.6"/><line x1="8" y1="10" x2="13" y2="10" stroke="#fff" stroke-width="1.5" opacity="0.6"/>`,
    speech: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    book: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#fff" stroke-width="1.5" fill="none"/><path d="M6 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6 2z" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    puzzle: `<path d="M19.439 7.85c-.049.322.059.648.293.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.293 2.5 2.5 0 0 0 0 5c.322.049.648-.059.878-.293l1.568-1.568c.47-.47 1.087-.706 1.704-.706s1.233.235 1.704.706l1.611 1.611a.98.98 0 0 1 .276.837 2.5 2.5 0 0 0 5 0 .979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707 2.402 2.402 0 0 1 1.704.706l1.568 1.568c.23.23.556.338.878.293a2.5 2.5 0 0 0 0-5 1.026 1.026 0 0 0-.878.293l-1.568 1.568a2.402 2.402 0 0 1-1.704.706 2.404 2.404 0 0 1-1.705-.707l-1.611-1.611a.979.979 0 0 1-.276-.837 2.5 2.5 0 0 0-5 0c-.07.47-.48.802-.925.968a.979.979 0 0 1-.837-.276l-1.61-1.61a2.404 2.404 0 0 1-.707-1.705c0-.617.236-1.234.706-1.704l1.568-1.568a1.026 1.026 0 0 0 .293-.878 2.5 2.5 0 0 0-5 0z" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    lighthouse: `<path d="M12 3v3M9 6h6M10 9h4l-1 12H11L10 9z" stroke="#fff" stroke-width="1.5" fill="none"/><circle cx="12" cy="3" r="1" fill="#fff"/>`,
    mindset: `<path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6l-1 5H9l-1-5c-1.5-1.5-3-3.5-3-6a7 7 0 0 1 7-7z" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    star: `<polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    shield: `<path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" stroke="#fff" stroke-width="1.5" fill="none"/>`,
    lion: `<circle cx="12" cy="13" r="8" stroke="#fff" stroke-width="1.5" fill="none"/><path d="M8 3l-2 4M16 3l2 4M6 8l-3 1M18 8l3 1" stroke="#fff" stroke-width="1.5"/>`,
    pillar: `<rect x="8" y="4" width="8" height="16" stroke="#fff" stroke-width="1.5" fill="none"/><line x1="6" y1="20" x2="18" y2="20" stroke="#fff" stroke-width="1.5"/>`,
    owl: `<circle cx="12" cy="12" r="9" stroke="#fff" stroke-width="1.5" fill="none"/><circle cx="9" cy="11" r="1.5" fill="#fff"/><circle cx="15" cy="11" r="1.5" fill="#fff"/><path d="M9 16c1 1 2 1.5 3 1.5s2-.5 3-1.5" stroke="#fff" stroke-width="1.5" fill="none"/>`,
  };

  return icons[iconName] ?? icons.book;
}

export function parseGradientColors(gradient: string | null): [string, string] {
  const matches = gradient?.match(/#[a-fA-F0-9]{3,8}/g);
  if (matches && matches.length >= 2) {
    return [matches[0], matches[1]];
  }
  return ["#1e293b", "#38bdf8"];
}

export const THEME_TAG_COLORS: Record<string, string> = {
  "Learning & Habits": "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  "Fiction & Literature": "text-amber-400 border-amber-400/30 bg-amber-400/10",
  "Productivity & Focus": "text-orange-400 border-orange-400/30 bg-orange-400/10",
  "Science & Academics": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "Psychology & Mindset": "text-violet-400 border-violet-400/30 bg-violet-400/10",
  Philosophy: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  "Stoicism & Virtues": "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  "General Backlog": "text-slate-400 border-slate-400/30 bg-slate-400/10",
};

export function getThemeTagClass(theme: string | null): string {
  if (!theme) return "text-slate-400 border-slate-400/30 bg-slate-400/10";
  return (
    THEME_TAG_COLORS[theme] ??
    "text-sky-400 border-sky-400/30 bg-sky-400/10"
  );
}
