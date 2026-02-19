-- Permite que o cliente com chave service_role (webhook) insira em history.
-- Com a chave service_role o Supabase costuma ignorar RLS; esta política garante
-- que o webhook funcione mesmo quando o RLS é aplicado ao insert.
create policy "service_role pode inserir em history"
  on public.history for insert
  to service_role
  with check (true);
