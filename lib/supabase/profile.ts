import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Profile } from "@/types/database";

export function profileFromUser(user: User): Omit<Profile, "created_at" | "updated_at"> & { created_at?: string; updated_at?: string } {
  const now = new Date().toISOString();
  return {
    id: user.id,
    email: user.email ?? "",
    account_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? "",
    creditos: 0,
    created_at: now,
    updated_at: now,
  };
}

/**
 * Garante que existe um registro em profiles para o usuário logado.
 * Se não existir, insere; se existir, atualiza apenas email e updated_at.
 */
export async function ensureProfile(supabase: SupabaseClient, user: User): Promise<{ error: Error | null }> { 
  console.log("ensureProfile", user);
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();
  console.log("existing", existing);
  const now = new Date().toISOString();

  if (existing) {
    const { error } = await supabase
      .from("profiles")
      .update({ email: user.email ?? "", updated_at: now })
      .eq("id", user.id);
    return { error: error ?? null };
  }

  const row = profileFromUser(user);
  console.log("row", row);
  const { data, error } = await supabase.from("profiles").insert({
    id: row.id,
    email: row.email,
    account_name: row.account_name,
    creditos: row.creditos,
  });
  console.log("data", data);
  console.log("error", error);
  return { error: error ?? null };
}
