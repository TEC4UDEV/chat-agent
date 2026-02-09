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

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Sidebar userEmail={user.email ?? ""} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
