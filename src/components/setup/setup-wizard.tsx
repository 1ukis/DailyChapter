"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  CURRICULUM_TEMPLATES,
  type CurriculumTemplate,
} from "@/data/curriculum-template";
import {
  useBooks,
  useCategories,
  useCreateBook,
  useImportBooks,
} from "@/hooks/use-books";
import { useUpdateProfile } from "@/hooks/use-profile";
import { queryKeys } from "@/lib/queries/keys";
import type { BookDifficulty } from "@/types/database";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SetupStep = "welcome" | "manual" | "template" | "review";

const DIFFICULTY_OPTIONS: { value: BookDifficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export function SetupWizard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: books = [] } = useBooks();
  const { data: categories = [] } = useCategories();
  const createBook = useCreateBook();
  const importBooks = useImportBooks();
  const updateProfile = useUpdateProfile();

  const [step, setStep] = useState<SetupStep>("welcome");
  const [selectedTemplate, setSelectedTemplate] =
    useState<CurriculumTemplate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [finishing, setFinishing] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("200");
  const [difficulty, setDifficulty] = useState<BookDifficulty>("easy");
  const [categoryId, setCategoryId] = useState("");

  async function handleAddBook(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const category = categories.find((c) => c.id === categoryId);

    try {
      await createBook.mutateAsync({
        title: title.trim(),
        author: author.trim() || undefined,
        pages: Number(pages) || 0,
        book_difficulty: difficulty,
        category_id: categoryId || null,
        theme: category?.name,
        sort_order: books.length,
        icon: "book",
        gradient: "linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)",
      });

      await queryClient.refetchQueries({ queryKey: queryKeys.books });

      setTitle("");
      setAuthor("");
      setPages("200");
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add book.");
    }
  }

  async function handleImportTemplate() {
    if (!selectedTemplate) return;
    setError(null);

    try {
      const payload = selectedTemplate.books.map((book, index) => {
        const category = categories.find((c) => c.name === book.theme);
        return {
          title: book.title,
          author: book.author,
          pages: book.pages,
          month: book.month,
          month_label: book.month_label,
          theme: book.theme,
          description: book.description,
          focus_question: book.focus_question,
          icon: book.icon,
          gradient: book.gradient,
          book_difficulty: book.book_difficulty,
          category_id: category?.id ?? null,
          sort_order: index,
        };
      });

      await importBooks.mutateAsync(payload);
      await queryClient.refetchQueries({ queryKey: queryKeys.books });
      setStep("review");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to import template.");
    }
  }

  async function finishSetup(skipBooks = false) {
    if (!skipBooks && books.length === 0) {
      setError("Add at least one book, import a template, or skip for now.");
      return;
    }

    setFinishing(true);
    setError(null);

    try {
      await updateProfile.mutateAsync({ setup_completed: true });
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete setup.");
      setFinishing(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-8 text-center">
        <p className="text-sm text-muted">Setup wizard</p>
        <h1 className="font-display mt-2 text-3xl font-bold">
          Build your reading curriculum
        </h1>
        <p className="mt-2 text-muted">
          Start from scratch, import a template, or skip and add books later.
        </p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      {step === "welcome" && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setStep("manual")}
            className="w-full rounded-2xl border border-white/10 bg-card p-6 text-left transition hover:border-accent/40"
          >
            <h2 className="font-display text-lg font-semibold">Add books manually</h2>
            <p className="mt-1 text-sm text-muted">
              Enter your first titles one at a time.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setStep("template")}
            className="w-full rounded-2xl border border-white/10 bg-card p-6 text-left transition hover:border-accent/40"
          >
            <h2 className="font-display text-lg font-semibold">Import a template</h2>
            <p className="mt-1 text-sm text-muted">
              Start with a curated reading list you can customize later.
            </p>
          </button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => finishSetup(true)}
            loading={finishing}
          >
            Skip for now — I&apos;ll add books later
          </Button>
        </div>
      )}

      {step === "manual" && (
        <form
          onSubmit={handleAddBook}
          className="space-y-4 rounded-2xl border border-white/10 bg-card p-6"
        >
          <h2 className="font-display text-lg font-semibold">Add a book</h2>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Atomic Habits"
            />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="James Clear"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="pages">Pages</Label>
              <Input
                id="pages"
                type="number"
                min={1}
                required
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                id="difficulty"
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
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setStep("welcome")}
            >
              Back
            </Button>
            <Button type="submit" loading={createBook.isPending}>
              Add book
            </Button>
          </div>
        </form>
      )}

      {step === "template" && (
        <div className="space-y-4">
          {CURRICULUM_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedTemplate(template)}
              className={`w-full rounded-2xl border p-6 text-left transition ${
                selectedTemplate?.id === template.id
                  ? "border-accent bg-accent/10"
                  : "border-white/10 bg-card hover:border-accent/40"
              }`}
            >
              <h2 className="font-display text-lg font-semibold">
                {template.name}
              </h2>
              <p className="mt-1 text-sm text-muted">{template.description}</p>
              <p className="mt-2 text-xs text-muted">
                {template.books.length} books
              </p>
            </button>
          ))}

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep("welcome")}>
              Back
            </Button>
            <Button
              disabled={!selectedTemplate}
              loading={importBooks.isPending}
              onClick={handleImportTemplate}
            >
              Import template
            </Button>
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-card p-6">
          <h2 className="font-display text-lg font-semibold">
            Your curriculum ({books.length} books)
          </h2>

          {books.length === 0 ? (
            <p className="text-sm text-muted">No books added yet.</p>
          ) : (
            <ul className="divide-y divide-white/10">
              {books.map((book) => (
                <li
                  key={book.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-muted">
                      {book.author ?? "Unknown author"} · {book.pages} pages
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs capitalize">
                    {book.book_difficulty}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="secondary" onClick={() => setStep("manual")}>
              Add another book
            </Button>
            <Button onClick={() => finishSetup()} loading={finishing}>
              Finish setup
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
