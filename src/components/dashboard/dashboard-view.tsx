"use client";

import { BookForm } from "@/components/dashboard/book-form";
import { CurriculumList } from "@/components/dashboard/curriculum-list";
import { FilterChips } from "@/components/dashboard/filter-chips";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { StoicCompanionPanel } from "@/components/dashboard/stoic-companion-panel";
import { ViewToggle } from "@/components/dashboard/view-toggle";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  useBooks,
  useCategories,
  useCreateBook,
  useDeleteBook,
  useReorderBook,
  useToggleBookComplete,
  useUpdateBook,
} from "@/hooks/use-books";
import { useProfile } from "@/hooks/use-profile";
import { useRealtimeSync } from "@/hooks/use-realtime";
import {
  computeDashboardMetrics,
  getFilterOptions,
  type DashboardView,
} from "@/lib/utils/curriculum";
import type { Book } from "@/types/database";
import { useState } from "react";

export function DashboardView() {
  useRealtimeSync("books", "stoic_tasks", "stoic_task_completions", "profiles");

  const { data: profile } = useProfile();
  const { data: books = [], isLoading, error } = useBooks();
  const { data: categories = [] } = useCategories();

  const createBook = useCreateBook();
  const updateBook = useUpdateBook();
  const deleteBook = useDeleteBook();
  const toggleComplete = useToggleBookComplete();
  const reorderBook = useReorderBook();

  const [view, setView] = useState<DashboardView>("timeline");
  const [activeFilter, setActiveFilter] = useState("all");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [togglingBookId, setTogglingBookId] = useState<string | null>(null);

  const timezone = profile?.timezone ?? "America/Toronto";
  const metrics = computeDashboardMetrics(books);
  const filterOptions = getFilterOptions(books, view);

  function handleViewChange(nextView: DashboardView) {
    setView(nextView);
    setActiveFilter("all");
  }

  async function handleToggleComplete(book: Book, completed: boolean) {
    setActionError(null);
    setTogglingBookId(book.id);
    try {
      await toggleComplete.mutateAsync({ book, completed });
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to update book.",
      );
    } finally {
      setTogglingBookId(null);
    }
  }

  async function handleDelete(book: Book) {
    if (!confirm(`Delete "${book.title}" from your curriculum?`)) return;
    setActionError(null);
    try {
      await deleteBook.mutateAsync(book.id);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to delete book.",
      );
    }
  }

  async function handleMove(book: Book, direction: "up" | "down") {
    setActionError(null);
    try {
      await reorderBook.mutateAsync({ bookId: book.id, direction, books });
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to reorder book.",
      );
    }
  }

  function openEdit(book: Book) {
    setEditingBook(book);
    setModal("edit");
  }

  function closeModal() {
    setModal(null);
    setEditingBook(null);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <MetricsGrid
        metrics={metrics}
        timezone={timezone}
        displayName={profile?.display_name}
      />

      {actionError && (
        <Alert variant="error" className="mt-6">
          {actionError}
        </Alert>
      )}

      {error && (
        <Alert variant="error" className="mt-6">
          {error instanceof Error ? error.message : "Failed to load books."}
        </Alert>
      )}

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ViewToggle view={view} onChange={handleViewChange} />
            <Button onClick={() => setModal("add")}>+ Add book</Button>
          </div>

          <FilterChips
            options={filterOptions}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl border border-white/10 bg-card"
                />
              ))}
            </div>
          ) : (
            <CurriculumList
              books={books}
              view={view}
              activeFilter={activeFilter}
              activeMonth={metrics.activeMonth}
              onToggleComplete={handleToggleComplete}
              onEdit={openEdit}
              onDelete={handleDelete}
              onMove={handleMove}
              togglingBookId={togglingBookId}
            />
          )}
        </div>

        <StoicCompanionPanel timezone={timezone} />
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-card p-6 shadow-2xl">
            <h2 className="font-display mb-4 text-xl font-semibold">
              {modal === "add" ? "Add book" : "Edit book"}
            </h2>
            <BookForm
              initial={editingBook ?? undefined}
              categories={categories}
              loading={createBook.isPending || updateBook.isPending}
              submitLabel={modal === "add" ? "Add book" : "Save changes"}
              onCancel={closeModal}
              onSubmit={async (data) => {
                setActionError(null);
                try {
                  if (modal === "add") {
                    await createBook.mutateAsync({
                      ...data,
                      sort_order: books.length,
                    });
                  } else if (editingBook) {
                    await updateBook.mutateAsync({
                      id: editingBook.id,
                      updates: data,
                    });
                  }
                  closeModal();
                } catch (err) {
                  setActionError(
                    err instanceof Error
                      ? err.message
                      : "Failed to save book.",
                  );
                }
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
