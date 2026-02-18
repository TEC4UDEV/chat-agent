-- Adiciona coluna dominio em configuracoes_cliente
alter table public.configuracoes_cliente
  add column if not exists dominio text null;
