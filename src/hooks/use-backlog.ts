"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queries/keys";
import { createClient } from "@/lib/supabase/client";
import type { BacklogItem, BookDifficulty } from "@/types/database";

async function fetchBacklog(): Promise<BacklogItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("backlog")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export type NewBacklogInput = {
  title: string;
  author?: string;
  pages: number;
  difficulty: BookDifficulty;
  category_id?: string | null;
  notes?: string;
  sort_order?: number;
};

export function useBacklog() {
  return useQuery({
    queryKey: queryKeys.backlog,
    queryFn: fetchBacklog,
  });
}

export function useCreateBacklogItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: NewBacklogInput) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("backlog")
        .insert({ ...item, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backlog });
    },
  });
}

export function useUpdateBacklogItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<NewBacklogInput & { assigned_month: number | null }>;
    }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("backlog")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backlog });
    },
  });
}

export function useDeleteBacklogItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from("backlog").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backlog });
    },
  });
}

export function useAssignBacklogToCurriculum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      item,
      month,
      categoryName,
      bookCount,
    }: {
      item: BacklogItem;
      month: number;
      categoryName?: string;
      bookCount: number;
    }) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error: bookError } = await supabase.from("books").insert({
        user_id: user.id,
        title: item.title,
        author: item.author,
        pages: item.pages,
        book_difficulty: item.difficulty,
        category_id: item.category_id,
        theme: categoryName ?? "General Backlog",
        month,
        month_label: `Month ${month}`,
        description: "Added from TBR backlog.",
        focus_question: "What are your core takeaways?",
        icon: "book",
        gradient: "linear-gradient(135deg, #1e293b 0%, #38bdf8 100%)",
        sort_order: bookCount,
      });

      if (bookError) throw bookError;

      const { error: deleteError } = await supabase
        .from("backlog")
        .delete()
        .eq("id", item.id);

      if (deleteError) throw deleteError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.backlog });
      queryClient.invalidateQueries({ queryKey: queryKeys.books });
    },
  });
}
