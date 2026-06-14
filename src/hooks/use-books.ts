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
