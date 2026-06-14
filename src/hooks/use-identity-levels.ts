"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queries/keys";
import { createClient } from "@/lib/supabase/client";
import type { ReadingIdentityLevel } from "@/types/database";

async function fetchIdentityLevels(): Promise<ReadingIdentityLevel[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reading_identity_levels")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export function useIdentityLevels() {
  return useQuery({
    queryKey: queryKeys.identityLevels,
    queryFn: fetchIdentityLevels,
  });
}
