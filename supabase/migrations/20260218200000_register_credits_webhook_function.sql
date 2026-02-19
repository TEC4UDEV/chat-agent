-- Registro de créditos via webhook sem depender de service_role.
-- Usa a tabela public.history (user_id, valor, retirada, data_pagamento, mp_payment_id).
-- A função roda com SECURITY DEFINER e valida um segredo antes de inserir/atualizar.
-- Depois de rodar esta migration:
-- 1. No SQL Editor: INSERT INTO public.webhook_secrets (id, secret) VALUES (1, 'escolha-um-token-secreto-forte');
-- 2. No .env: CHECKOUT_WEBHOOK_SECRET=escolha-um-token-secreto-forte

create table if not exists public.webhook_secrets (
  id int primary key default 1,
  secret text not null
);

alter table public.webhook_secrets enable row level security;

-- Permite ao role owner (postgres) ler o segredo dentro da função SECURITY DEFINER.
-- No Supabase Cloud o owner costuma ser postgres; se falhar, crie a policy manualmente para o role do seu projeto.
create policy "definer_pode_ler_webhook_secrets"
  on public.webhook_secrets for select
  to postgres
  using (true);

create or replace function public.register_credits_webhook(
  secret_key text,
  p_user_id uuid,
  p_amount numeric,
  p_mp_payment_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.webhook_secrets where id = 1 and secret = secret_key
  ) then
    raise exception 'invalid_webhook_secret';
  end if;

  insert into public.history (user_id, valor, retirada, data_pagamento, mp_payment_id)
  values (p_user_id, p_amount, false, now(), p_mp_payment_id);

  update public.profiles
  set creditos = coalesce(creditos, 0) + p_amount,
      updated_at = now()
  where id = p_user_id;
exception
  when unique_violation then
    null;
end;
$$;

grant execute on function public.register_credits_webhook(text, uuid, numeric, text) to anon;
grant execute on function public.register_credits_webhook(text, uuid, numeric, text) to authenticated;

comment on function public.register_credits_webhook is 'Webhook Checkout Pro: registra créditos em history e profiles. Exige secret_key igual ao em webhook_secrets.';
