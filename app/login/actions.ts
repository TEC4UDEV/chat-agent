"use server";

import { createClient } from "@/lib/supabase/server";
import { ensureProfile } from "@/lib/supabase/profile";

/**
 * Garante que o perfil do usuário logado existe na tabela profiles.
 * Chamado após login por e-mail, antes do redirect.
 */
export async function ensureProfileOnLogin(): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError) return { error: authError.message };
  if (!user) return { error: "Usuário não autenticado" };

  const { error } = await ensureProfile(supabase, user);
  return { error: error?.message ?? null };
}
