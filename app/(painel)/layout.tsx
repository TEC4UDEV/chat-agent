import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/sidebar";
import { redirect } from "next/navigation";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("creditos")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Sidebar userEmail={user.email ?? ""} creditos={profile?.creditos ?? 0} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
