"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function useSignOut() {
  const router = useRouter();

  return async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };
}
