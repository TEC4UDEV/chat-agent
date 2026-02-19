-- Função interna sem validação de segredo (segredo validado na API).
-- Só pode ser chamada com a chave service_role (execute revogado de anon/authenticated).
-- Permite que o owner da função (postgres) insira em history. Se der erro de role, crie no SQL Editor para o role do seu projeto.
create policy "postgres_pode_inserir_em_history"
  on public.history for insert
  to postgres
  with check (true);

create or replace function public.register_credits_webhook_internal(
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

revoke execute on function public.register_credits_webhook_internal(uuid, numeric, text) from anon;
revoke execute on function public.register_credits_webhook_internal(uuid, numeric, text) from authenticated;
grant execute on function public.register_credits_webhook_internal(uuid, numeric, text) to service_role;

comment on function public.register_credits_webhook_internal is 'Registra créditos (history + profiles). Chamar apenas com service_role após validar CHECKOUT_WEBHOOK_SECRET na API.';