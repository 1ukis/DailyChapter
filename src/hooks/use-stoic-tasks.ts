"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queries/keys";
import { createClient } from "@/lib/supabase/client";
import { getTodayInTimezone } from "@/lib/utils/date";
import type { StoicTask } from "@/types/database";

async function fetchStoicTasks(): Promise<StoicTask[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("stoic_tasks")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

async function fetchTodayCompletions(
  timezone: string,
): Promise<Set<string>> {
  const supabase = createClient();
  const today = getTodayInTimezone(timezone);

  const { data, error } = await supabase
    .from("stoic_task_completions")
    .select("task_id")
    .eq("completion_date", today);

  if (error) throw error;
  return new Set((data ?? []).map((row) => row.task_id));
}

export function useStoicTasks(timezone: string) {
  const tasksQuery = useQuery({
    queryKey: queryKeys.stoicTasks,
    queryFn: fetchStoicTasks,
  });

  const completionsQuery = useQuery({
    queryKey: [...queryKeys.stoicCompletions, timezone],
    queryFn: () => fetchTodayCompletions(timezone),
  });

  return {
    tasks: tasksQuery.data ?? [],
    completedTaskIds: completionsQuery.data ?? new Set<string>(),
    isLoading: tasksQuery.isLoading || completionsQuery.isLoading,
    error: tasksQuery.error ?? completionsQuery.error,
  };
}

export function useCreateStoicTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      title: string;
      description?: string;
      sort_order?: number;
    }) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("stoic_tasks")
        .insert({
          user_id: user.id,
          title: input.title,
          description: input.description,
          sort_order: input.sort_order ?? 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stoicTasks });
    },
  });
}

export function useUpdateStoicTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Pick<StoicTask, "title" | "description" | "sort_order" | "is_active">>;
    }) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("stoic_tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stoicTasks });
    },
  });
}

export function useDeleteStoicTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase
        .from("stoic_tasks")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stoicTasks });
    },
  });
}

export function useToggleStoicCompletion(timezone: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      completed,
    }: {
      taskId: string;
      completed: boolean;
    }) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const today = getTodayInTimezone(timezone);

      if (completed) {
        const { error } = await supabase
          .from("stoic_task_completions")
          .insert({
            user_id: user.id,
            task_id: taskId,
            completion_date: today,
          });

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("stoic_task_completions")
          .delete()
          .eq("task_id", taskId)
          .eq("completion_date", today);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.stoicCompletions, timezone],
      });
    },
  });
}
