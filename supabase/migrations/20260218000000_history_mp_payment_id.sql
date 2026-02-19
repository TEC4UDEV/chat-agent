-- Identificador do pagamento Mercado Pago para evitar processar o mesmo webhook duas vezes
alter table public.history
  add column if not exists mp_payment_id text null;

create unique index if not exists history_mp_payment_id_key
  on public.history (mp_payment_id)
  where mp_payment_id is not null;

comment on column public.history.mp_payment_id is 'ID do pagamento no Mercado Pago (evita duplicar crédito no webhook).';
