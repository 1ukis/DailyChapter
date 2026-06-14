"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queries/keys";
import { createClient } from "@/lib/supabase/client";
import type { Streak } from "@/types/database";

async function fetchStreak(): Promise<Streak | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("streaks")
    .select("*")
    .maybeSingle();

  if (error) throw error;
  return data;
}

export function useStreak() {
  return useQuery({
    queryKey: queryKeys.streaks,
    queryFn: fetchStreak,
  });
}
