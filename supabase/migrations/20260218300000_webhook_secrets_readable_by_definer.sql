-- Faz a função register_credits_webhook conseguir ler webhook_secrets:
-- desliga RLS e revoga SELECT de anon/authenticated. Só o owner (definer) consegue ler.
drop policy if exists "definer_pode_ler_webhook_secrets" on public.webhook_secrets;
alter table public.webhook_secrets disable row level security;

revoke select on public.webhook_secrets from anon;
revoke select on public.webhook_secrets from authenticated;
revoke select on public.webhook_secrets from public;
