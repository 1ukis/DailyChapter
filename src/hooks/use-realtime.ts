"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { queryKeys } from "@/lib/queries/keys";

type RealtimeTable =
  | "books"
  | "stoic_tasks"
  | "stoic_task_completions"
  | "profiles"
  | "logs"
  | "streaks"
  | "backlog"
  | "reading_identity_levels";

const TABLE_QUERY_MAP: Record<RealtimeTable, readonly string[]> = {
  books: queryKeys.books,
  stoic_tasks: queryKeys.stoicTasks,
  stoic_task_completions: queryKeys.stoicCompletions,
  profiles: queryKeys.profile,
  logs: queryKeys.logs,
  streaks: queryKeys.streaks,
  backlog: queryKeys.backlog,
  reading_identity_levels: queryKeys.identityLevels,
};

export function useRealtimeSync(..._tables: RealtimeTable[]) {
  const queryClient = useQueryClient();
  const tablesKey = _tables.join(",");

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel("dashboard-realtime");
    const tableList = tablesKey.split(",") as RealtimeTable[];

    tableList.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          const queryKey = TABLE_QUERY_MAP[table];
          queryClient.invalidateQueries({ queryKey });
        },
      );
    });

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, tablesKey]);
}
