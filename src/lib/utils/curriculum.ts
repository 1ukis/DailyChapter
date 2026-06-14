import type { Book, BookDifficulty } from "@/types/database";

export type DashboardView = "timeline" | "theme";

const DIFFICULTY_PAGE_MULTIPLIER: Record<BookDifficulty, number> = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

export interface DashboardMetrics {
  totalBooks: number;
  completedBooks: number;
  totalPages: number;
  completedPages: number;
  progressPercent: number;
  activeMonth: number | null;
  activeMonthLabel: string;
}

export function computeDashboardMetrics(books: Book[]): DashboardMetrics {
  const curriculumBooks = books.filter((b) => !b.is_companion);
  const totalBooks = curriculumBooks.length;
  const completedBooks = curriculumBooks.filter((b) => b.completed_at).length;
  const totalPages = curriculumBooks.reduce((sum, b) => sum + b.pages, 0);
  const completedPages = curriculumBooks
    .filter((b) => b.completed_at)
    .reduce((sum, b) => sum + b.pages, 0);
  const progressPercent =
    totalPages > 0 ? Math.round((completedPages / totalPages) * 100) : 0;

  const activeMonth = getActiveMonth(curriculumBooks);

  return {
    totalBooks,
    completedBooks,
    totalPages,
    completedPages,
    progressPercent,
    activeMonth,
    activeMonthLabel: activeMonth
      ? curriculumBooks.find((b) => b.month === activeMonth)?.month_label ??
        `Month ${activeMonth}`
      : "No active month",
  };
}

export function getActiveMonth(books: Book[]): number | null {
  const months = [
    ...new Set(
      books
        .map((b) => b.month)
        .filter((m): m is number => m !== null && m !== undefined),
    ),
  ].sort((a, b) => a - b);

  for (const month of months) {
    const monthBooks = books.filter((b) => b.month === month);
    if (monthBooks.some((b) => !b.completed_at)) {
      return month;
    }
  }

  return months[months.length - 1] ?? null;
}

export interface MonthMetrics {
  actualTotalPages: number;
  dailyGoal: number;
}

export function computeMonthMetrics(monthBooks: Book[]): MonthMetrics {
  let actualTotalPages = 0;
  let effectiveTotalPages = 0;

  monthBooks.forEach((book) => {
    actualTotalPages += book.pages;
    const mult = DIFFICULTY_PAGE_MULTIPLIER[book.book_difficulty] ?? 1;
    effectiveTotalPages += book.pages * mult;
  });

  const dailyGoal = Math.round(effectiveTotalPages / 30) || 0;

  return { actualTotalPages, dailyGoal };
}

export interface MonthGroup {
  key: string;
  label: string;
  dateSpan: string;
  books: Book[];
}

export function groupBooksByMonth(
  books: Book[],
  activeFilter: string,
): MonthGroup[] {
  const curriculumBooks = books.filter((b) => !b.is_companion);
  const monthMap = new Map<string, { label: string; dateSpan: string }>();

  curriculumBooks.forEach((book) => {
    const key = book.month != null ? String(book.month) : "unassigned";
    const label =
      book.month_label ??
      (book.month != null ? `Month ${book.month}` : "Unassigned");
    const dateSpan = book.month_label?.includes("(")
      ? (book.month_label.split("(")[1]?.replace(")", "") ?? "Custom")
      : "Custom allocation";

    if (!monthMap.has(key)) {
      monthMap.set(key, { label, dateSpan });
    }
  });

  const sortedKeys = [...monthMap.keys()].sort((a, b) => {
    const aNum = Number(a);
    const bNum = Number(b);
    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) return aNum - bNum;
    if (!Number.isNaN(aNum)) return -1;
    if (!Number.isNaN(bNum)) return 1;
    return a.localeCompare(b);
  });

  return sortedKeys
    .filter((key) => activeFilter === "all" || activeFilter === key)
    .map((key) => {
      const meta = monthMap.get(key)!;
      return {
        key,
        label: meta.label,
        dateSpan: meta.dateSpan,
        books: curriculumBooks.filter(
          (b) =>
            (b.month != null ? String(b.month) : "unassigned") === key,
        ),
      };
    });
}

export interface ThemeGroup {
  theme: string;
  books: Book[];
}

export function groupBooksByTheme(
  books: Book[],
  activeFilter: string,
): ThemeGroup[] {
  const curriculumBooks = books.filter((b) => !b.is_companion);
  const themes = [
    ...new Set(
      curriculumBooks.map((b) => b.theme).filter((t): t is string => !!t),
    ),
  ];

  return themes
    .filter((theme) => activeFilter === "all" || activeFilter === theme)
    .map((theme) => ({
      theme,
      books: curriculumBooks.filter((b) => b.theme === theme),
    }));
}

export function getFilterOptions(
  books: Book[],
  view: DashboardView,
): { value: string; label: string }[] {
  if (view === "timeline") {
    const monthMap = new Map<string, string>();
    books
      .filter((b) => !b.is_companion)
      .forEach((book) => {
        const key = book.month != null ? String(book.month) : "unassigned";
        const label =
          book.month_label ??
          (book.month != null ? `Month ${book.month}` : "Unassigned");
        monthMap.set(key, label);
      });

    return [...monthMap.entries()]
      .sort(([a], [b]) => {
        const aNum = Number(a);
        const bNum = Number(b);
        if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) return aNum - bNum;
        return a.localeCompare(b);
      })
      .map(([value, label]) => ({ value, label }));
  }

  return [
    ...new Set(
      books
        .filter((b) => !b.is_companion && b.theme)
        .map((b) => b.theme as string),
    ),
  ].map((theme) => ({ value: theme, label: theme }));
}
