import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=supabase_not_configured");
  }

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("setup_completed")
    .single();

  if (profile?.setup_completed) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
