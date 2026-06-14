"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  useAssignBacklogToCurriculum,
  useBacklog,
  useCreateBacklogItem,
  useDeleteBacklogItem,
  useUpdateBacklogItem,
} from "@/hooks/use-backlog";
import { useBooks, useCategories } from "@/hooks/use-books";
import type { BacklogItem, BookDifficulty } from "@/types/database";
import { useState } from "react";

const DIFFICULTY_OPTIONS: { value: BookDifficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export function TbrPanel() {
  const { data: items = [], isLoading } = useBacklog();
  const { data: categories = [] } = useCategories();
  const { data: books = [] } = useBooks();
  const createItem = useCreateBacklogItem();
  const updateItem = useUpdateBacklogItem();
  const deleteItem = useDeleteBacklogItem();
  const assignItem = useAssignBacklogToCurriculum();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("300");
  const [difficulty, setDifficulty] = useState<BookDifficulty>("easy");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [monthInputs, setMonthInputs] = useState<Record<string, string>>({});

  const monthOptions = [
    ...new Set(
      books
        .filter((b) => b.month != null)
        .map((b) => b.month as number),
    ),
  ].sort((a, b) => a - b);

  async function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Please enter a book title.");
      return;
    }

    setError(null);
    try {
      await createItem.mutateAsync({
        title: title.trim(),
        author: author.trim() || undefined,
        pages: Number(pages) || 300,
        difficulty,
        category_id: categoryId || null,
        sort_order: items.length,
      });
      setTitle("");
      setAuthor("");
      setPages("300");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add book.");
    }
  }

  async function handleAssign(item: BacklogItem) {
    const raw = monthInputs[item.id]?.trim();
    if (!raw) {
      setError("Enter a month number to assign this book.");
      return;
    }

    const month = Number(raw);
    if (Number.isNaN(month) || month < 1) {
      setError("Month must be a positive number.");
      return;
    }

    const categoryName = categories.find((c) => c.id === item.category_id)?.name;

    setError(null);
    try {
      await assignItem.mutateAsync({
        item,
        month,
        categoryName,
        bookCount: books.length,
      });
      setMonthInputs((prev) => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to assign book.");
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-6">
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold">TBR Backlog</h2>
        <p className="mt-1 text-sm text-muted">
          Queue books to read later and assign them to your curriculum.
        </p>
      </div>

      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleAdd} className="space-y-3 border-b border-white/10 pb-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="tbr-title">Title</Label>
            <Input
              id="tbr-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book title"
            />
          </div>
          <div>
            <Label htmlFor="tbr-author">Author</Label>
            <Input
              id="tbr-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Author name"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="tbr-pages">Pages</Label>
            <Input
              id="tbr-pages"
              type="number"
              min={1}
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tbr-difficulty">Difficulty</Label>
            <Select
              id="tbr-difficulty"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as BookDifficulty)
              }
            >
              {DIFFICULTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="tbr-category">Category</Label>
            <Select
              id="tbr-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">General Backlog</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <Button type="submit" size="sm" loading={createItem.isPending}>
          Add to backlog
        </Button>
      </form>

      <div className="mt-6 space-y-3">
        {isLoading && <p className="text-sm text-muted">Loading backlog...</p>}

        {!isLoading && items.length === 0 && (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-muted">
            No backlog books yet. Add one above!
          </p>
        )}

        {items.map((item) => {
          const categoryName =
            categories.find((c) => c.id === item.category_id)?.name ??
            "General Backlog";

          return (
            <div
              key={item.id}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              {editingId === item.id ? (
                <TbrEditRow
                  item={item}
                  categories={categories}
                  onSave={async (updates) => {
                    await updateItem.mutateAsync({ id: item.id, updates });
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                  loading={updateItem.isPending}
                />
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-xs text-muted">
                        {item.author ?? "Unknown"} · {item.pages} pages ·{" "}
                        {categoryName}
                      </p>
                      <span className="mt-2 inline-block rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase">
                        {item.difficulty}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => setEditingId(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-red-400"
                        onClick={() => deleteItem.mutate(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Input
                      list={`months-${item.id}`}
                      placeholder="Assign month #"
                      className="h-8 max-w-[140px] text-sm"
                      value={monthInputs[item.id] ?? ""}
                      onChange={(e) =>
                        setMonthInputs((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                    />
                    <datalist id={`months-${item.id}`}>
                      {monthOptions.map((m) => (
                        <option key={m} value={String(m)}>
                          Month {m}
                        </option>
                      ))}
                    </datalist>
                    <Button
                      size="sm"
                      variant="secondary"
                      loading={assignItem.isPending}
                      onClick={() => handleAssign(item)}
                    >
                      Assign to curriculum
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TbrEditRow({
  item,
  categories,
  onSave,
  onCancel,
  loading,
}: {
  item: BacklogItem;
  categories: { id: string; name: string }[];
  onSave: (updates: {
    title: string;
    author?: string;
    pages: number;
    difficulty: BookDifficulty;
    category_id?: string | null;
  }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [title, setTitle] = useState(item.title);
  const [author, setAuthor] = useState(item.author ?? "");
  const [pages, setPages] = useState(String(item.pages));
  const [difficulty, setDifficulty] = useState(item.difficulty);
  const [categoryId, setCategoryId] = useState(item.category_id ?? "");

  return (
    <div className="space-y-3">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
      <div className="grid gap-2 sm:grid-cols-3">
        <Input
          type="number"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <Select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value as BookDifficulty)
          }
        >
          {DIFFICULTY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">General</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          loading={loading}
          onClick={() =>
            onSave({
              title: title.trim(),
              author: author.trim() || undefined,
              pages: Number(pages) || 0,
              difficulty,
              category_id: categoryId || null,
            })
          }
        >
          Save
        </Button>
        <Button size="sm" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
