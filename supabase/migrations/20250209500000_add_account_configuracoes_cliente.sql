-- Adiciona coluna account em configuracoes_cliente
alter table public.configuracoes_cliente
  add column if not exists account text null;
