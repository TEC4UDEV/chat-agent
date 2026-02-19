import { createClient } from "@/lib/supabase/server";
import { PagamentoForm } from "./pagamento-form";

export default async function PagamentoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const fullName =
    (user.user_metadata?.full_name as string) ??
    (user.user_metadata?.name as string) ??
    "";
  const parts = fullName.trim().split(/\s+/);
  const payer = user.email
    ? {
        email: user.email,
        name: parts[0] ?? "",
        surname: parts.slice(1).join(" ") ?? "",
      }
    : null;

  return <PagamentoForm userId={user.id} payer={payer} />;
}
