"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queries/keys";
import { createClient } from "@/lib/supabase/client";
import type { Book, BookCategory, BookDifficulty } from "@/types/database";

async function fetchBooks(): Promise<Book[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

async function fetchCategories(): Promise<BookCategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("book_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export function useBooks() {
  return useQuery({
    queryKey: queryKeys.books,
    queryFn: fetchBooks,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
  });
}

export type NewBookInput = {
  title: string;
  author?: string;
  pages: number;
  book_difficulty: BookDifficulty;
  category_id?: string | null;
  theme?: string;
  month?: number | null;
  month_label?: string;
  description?: string;
  focus_question?: string;
  icon?: string;
  gradient?: string;
  sort_order?: number;
  is_companion?: boolean;
};

export type UpdateBookInput = Partial<NewBookInput> & {
  completed_at?: string | null;
};

export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: NewBookInput) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("books")
        .insert({ ...book, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books });
    },
  });
}

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateBookInput;
    }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("books")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books });
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books });
    },
  });
}

export function useToggleBookComplete() {
  const updateBook = useUpdateBook();

  return useMutation({
    mutationFn: async ({
      book,
      completed,
    }: {
      book: Book;
      completed: boolean;
    }) => {
      return updateBook.mutateAsync({
        id: book.id,
        updates: {
          completed_at: completed ? new Date().toISOString() : null,
        },
      });
    },
  });
}

export function useReorderBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      direction,
      books,
    }: {
      bookId: string;
      direction: "up" | "down";
      books: Book[];
    }) => {
      const index = books.findIndex((b) => b.id === bookId);
      if (index === -1) throw new Error("Book not found");

      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= books.length) return;

      const current = books[index];
      const neighbor = books[swapIndex];

      const supabase = createClient();
      const { error: error1 } = await supabase
        .from("books")
        .update({ sort_order: neighbor.sort_order })
        .eq("id", current.id);

      if (error1) throw error1;

      const { error: error2 } = await supabase
        .from("books")
        .update({ sort_order: current.sort_order })
        .eq("id", neighbor.id);

      if (error2) throw error2;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books });
    },
  });
}

export function useImportBooks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (books: NewBookInput[]) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const rows = books.map((book, index) => ({
        ...book,
        user_id: user.id,
        sort_order: book.sort_order ?? index,
      }));

      const { data, error } = await supabase
        .from("books")
        .insert(rows)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books });
    },
  });
}
