import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
