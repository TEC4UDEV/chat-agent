import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase com service role (bypassa RLS).
 * Usar apenas no servidor (ex.: webhooks, jobs) e nunca expor ao cliente.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios para o cliente admin."
    );
  }
  return createClient(url, serviceRoleKey);
}
