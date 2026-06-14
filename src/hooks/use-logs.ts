"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queries/keys";
import { createClient } from "@/lib/supabase/client";
import { getRollingYearRange } from "@/lib/utils/date";
import { calculateStreaks } from "@/lib/utils/streaks";
import type { Log, LogDifficulty, Profile } from "@/types/database";

async function fetchLogs(timezone: string): Promise<Log[]> {
  const supabase = createClient();
  const { start } = getRollingYearRange(timezone);

  const { data, error } = await supabase
    .from("logs")
    .select("*")
    .gte("log_date", start)
    .order("log_date", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export function useLogs(timezone: string) {
  return useQuery({
    queryKey: [...queryKeys.logs, timezone],
    queryFn: () => fetchLogs(timezone),
  });
}

export function useUpsertLog(timezone: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: {
      log_date: string;
      pages: number;
      target_pages: number;
      difficulty: LogDifficulty;
      book_id?: string | null;
      base_goal?: number;
      default_log_difficulty?: LogDifficulty;
      selected_book_id?: string | null;
    }) => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { data: log, error: logError } = await supabase
        .from("logs")
        .upsert(
          {
            user_id: user.id,
            log_date: input.log_date,
            pages: input.pages,
            target_pages: input.target_pages,
            difficulty: input.difficulty,
            book_id: input.book_id ?? null,
          },
          { onConflict: "user_id,log_date" },
        )
        .select()
        .single();

      if (logError) throw logError;

      const allLogs = await fetchLogs(timezone);
      const merged = [
        ...allLogs.filter((l) => l.log_date !== input.log_date),
        log,
      ];
      const { currentStreak, longestStreak } = calculateStreaks(
        merged,
        timezone,
      );

      const { error: streakError } = await supabase.from("streaks").upsert(
        {
          user_id: user.id,
          current_streak: currentStreak,
          longest_streak: longestStreak,
          last_log_date: input.log_date,
        },
        { onConflict: "user_id" },
      );

      if (streakError) throw streakError;

      if (
        input.base_goal !== undefined ||
        input.default_log_difficulty !== undefined ||
        input.selected_book_id !== undefined
      ) {
        const profileUpdates: Partial<
          Pick<Profile, "base_goal" | "default_log_difficulty" | "selected_book_id">
        > = {};
        if (input.base_goal !== undefined) profileUpdates.base_goal = input.base_goal;
        if (input.default_log_difficulty !== undefined) {
          profileUpdates.default_log_difficulty = input.default_log_difficulty;
        }
        if (input.selected_book_id !== undefined) {
          profileUpdates.selected_book_id = input.selected_book_id;
        }

        await supabase
          .from("profiles")
          .update(profileUpdates)
          .eq("id", user.id);
      }

      return { log, currentStreak, longestStreak, metGoal: input.pages >= input.target_pages };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.logs });
      queryClient.invalidateQueries({ queryKey: queryKeys.streaks });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}
