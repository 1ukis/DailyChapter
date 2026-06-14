"use client";

import { BookCard } from "@/components/dashboard/book-card";
import {
  computeMonthMetrics,
  groupBooksByMonth,
  groupBooksByTheme,
  type DashboardView,
} from "@/lib/utils/curriculum";
import type { Book } from "@/types/database";

interface CurriculumListProps {
  books: Book[];
  view: DashboardView;
  activeFilter: string;
  activeMonth: number | null;
  onToggleComplete: (book: Book, completed: boolean) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onMove: (book: Book, direction: "up" | "down") => void;
  togglingBookId?: string | null;
}

export function CurriculumList({
  books,
  view,
  activeFilter,
  activeMonth,
  onToggleComplete,
  onEdit,
  onDelete,
  onMove,
  togglingBookId,
}: CurriculumListProps) {
  if (books.filter((b) => !b.is_companion).length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-card/40 px-6 py-16 text-center">
        <p className="font-display text-lg font-semibold">No books yet</p>
        <p className="mt-2 text-sm text-muted">
          Add your first book to start building your curriculum.
        </p>
      </div>
    );
  }

  if (view === "timeline") {
    const groups = groupBooksByMonth(books, activeFilter);

    return (
      <div className="space-y-10">
        {groups.map((group) => {
          const monthMetrics = computeMonthMetrics(group.books);
          const isActive =
            activeMonth !== null && String(activeMonth) === group.key;

          return (
            <section key={group.key} id={`month-group-${group.key}`}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-display flex items-center gap-2 text-xl font-semibold">
                    {group.label}
                    {isActive && (
                      <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
                        Active Focus
                      </span>
                    )}
                  </h2>
                  <p className="mt-1 text-xs text-muted">{group.dateSpan}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-right text-xs">
                  <p className="font-semibold uppercase tracking-wide text-muted">
                    Monthly Targets
                  </p>
                  <div className="mt-1 flex gap-4">
                    <span>
                      <strong className="text-foreground">
                        {monthMetrics.actualTotalPages}
                      </strong>{" "}
                      total pages
                    </span>
                    <span>
                      <strong className="text-accent">
                        {monthMetrics.dailyGoal}
                      </strong>{" "}
                      base pages/day
                    </span>
                  </div>
                </div>
              </div>

              {group.books.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {group.books.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onToggleComplete={onToggleComplete}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onMove={onMove}
                      isToggling={togglingBookId === book.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-white/10 px-6 py-10 text-center text-sm text-muted">
                  No books assigned to this month.
                </div>
              )}
            </section>
          );
        })}
      </div>
    );
  }

  const themeGroups = groupBooksByTheme(books, activeFilter);

  return (
    <div className="space-y-10">
      {themeGroups.map((group) => (
        <section key={group.theme}>
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-display text-xl font-semibold">
              {group.theme}
            </h2>
            <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted">
              {group.books.length} books
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}
                isToggling={togglingBookId === book.id}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
