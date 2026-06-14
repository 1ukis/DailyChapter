"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { Book, BookCategory, BookDifficulty } from "@/types/database";
import type { NewBookInput } from "@/hooks/use-books";

const DIFFICULTY_OPTIONS: { value: BookDifficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

interface BookFormProps {
  initial?: Partial<Book>;
  categories: BookCategory[];
  onSubmit: (data: NewBookInput) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  loading?: boolean;
}

export function BookForm({
  initial,
  categories,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  loading,
}: BookFormProps) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    await onSubmit({
      title: String(form.get("title")).trim(),
      author: String(form.get("author")).trim() || undefined,
      pages: Number(form.get("pages")) || 0,
      book_difficulty: form.get("difficulty") as BookDifficulty,
      category_id: String(form.get("category")) || null,
      theme:
        categories.find((c) => c.id === String(form.get("category")))?.name ??
        undefined,
      month: form.get("month") ? Number(form.get("month")) : null,
      month_label: String(form.get("month_label")).trim() || undefined,
      description: String(form.get("description")).trim() || undefined,
      focus_question: String(form.get("focus_question")).trim() || undefined,
      icon: initial?.icon ?? "book",
      gradient:
        initial?.gradient ??
        "linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          required
          defaultValue={initial?.title ?? ""}
        />
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          defaultValue={initial?.author ?? ""}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="pages">Pages</Label>
          <Input
            id="pages"
            name="pages"
            type="number"
            min={1}
            required
            defaultValue={initial?.pages ?? 200}
          />
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            id="difficulty"
            name="difficulty"
            defaultValue={initial?.book_difficulty ?? "easy"}
          >
            {DIFFICULTY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="month">Month #</Label>
          <Input
            id="month"
            name="month"
            type="number"
            min={1}
            defaultValue={initial?.month ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="month_label">Month label</Label>
          <Input
            id="month_label"
            name="month_label"
            defaultValue={initial?.month_label ?? ""}
            placeholder="Month 1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          name="category"
          defaultValue={initial?.category_id ?? ""}
        >
          <option value="">Uncategorized</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          defaultValue={initial?.description ?? ""}
        />
      </div>

      <div>
        <Label htmlFor="focus_question">Focus question</Label>
        <Input
          id="focus_question"
          name="focus_question"
          defaultValue={initial?.focus_question ?? ""}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
