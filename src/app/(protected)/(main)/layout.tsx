import { AppNav } from "@/components/layout/app-nav";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("setup_completed")
    .single();

  if (!profile?.setup_completed) {
    redirect("/setup");
  }

  return (
    <div className="min-h-screen">
      <AppNav />
      {children}
    </div>
  );
}
