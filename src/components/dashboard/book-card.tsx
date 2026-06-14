"use client";

import { BookCover } from "@/components/dashboard/book-cover";
import { Button } from "@/components/ui/button";
import { getThemeTagClass } from "@/lib/utils/book-icons";
import type { Book } from "@/types/database";

interface BookCardProps {
  book: Book;
  onToggleComplete: (book: Book, completed: boolean) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onMove: (book: Book, direction: "up" | "down") => void;
  isToggling?: boolean;
}

export function BookCard({
  book,
  onToggleComplete,
  onEdit,
  onDelete,
  onMove,
  isToggling,
}: BookCardProps) {
  const isCompleted = !!book.completed_at;
  const theme = book.theme ?? "General";

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-card transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 ${
        isCompleted
          ? "border-success/30 opacity-80"
          : "border-white/10"
      }`}
    >
      <div className="relative">
        <BookCover book={book} />
        <div className="absolute right-3 top-3">
          <label className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur transition hover:border-success/50">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCompleted}
              disabled={isToggling}
              onChange={(e) => onToggleComplete(book, e.target.checked)}
              aria-label={`Mark ${book.title} as read`}
            />
            <span
              className={`flex h-4 w-4 items-center justify-center rounded border ${
                isCompleted
                  ? "border-success bg-success text-background"
                  : "border-white/40"
              }`}
            >
              {isCompleted && (
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
                  <path d="M4.5 8.5L1.5 5.5l1-1 2 2 5-5 1 1-6 6z" />
                </svg>
              )}
            </span>
          </label>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span
          className={`mb-2 inline-flex w-fit rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getThemeTagClass(theme)}`}
        >
          {theme}
        </span>

        <h3 className="font-display text-base font-semibold leading-snug">
          {book.title}
        </h3>
        <p className="mt-1 text-xs text-muted">
          by {book.author ?? "Unknown"}
        </p>

        {book.description && (
          <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
            {book.description}
          </p>
        )}

        {book.focus_question && (
          <p className="mt-3 border-t border-dashed border-white/10 pt-3 text-xs italic text-slate-300">
            <span className="font-semibold not-italic">Focus:</span>{" "}
            {book.focus_question}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted">{book.pages} pages</span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
              book.book_difficulty === "easy"
                ? "bg-emerald-500/15 text-emerald-400"
                : book.book_difficulty === "medium"
                  ? "bg-amber-500/15 text-amber-400"
                  : "bg-red-500/15 text-red-400"
            }`}
          >
            {book.book_difficulty}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-1 border-t border-white/5 pt-3 opacity-0 transition group-hover:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => onEdit(book)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-xs"
            onClick={() => onMove(book, "up")}
            aria-label="Move up"
          >
            ↑
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-xs"
            onClick={() => onMove(book, "down")}
            aria-label="Move down"
          >
            ↓
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto text-xs text-red-400 hover:text-red-300"
            onClick={() => onDelete(book)}
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
}
