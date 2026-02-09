-- Tabela history (histórico de transações de crédito)
create table if not exists public.history (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  data_pagamento timestamptz null default now(),
  valor numeric(10, 2) null,
  retirada boolean null default false,
  created_at timestamptz null default now(),
  updated_at timestamptz null,
  thread_id text null,
  constraint history_pkey primary key (id),
  constraint history_user_id_fkey foreign key (user_id) references public.profiles (id) on delete cascade
) tablespace pg_default;

create index if not exists history_user_id_idx on public.history (user_id);
create index if not exists history_updated_at_idx on public.history (updated_at desc);
create index if not exists history_retirada_idx on public.history (retirada);

-- RLS
alter table public.history enable row level security;

create policy "Usuários podem ver o próprio histórico"
  on public.history for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir no próprio histórico"
  on public.history for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar o próprio histórico"
  on public.history for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Usuários podem excluir do próprio histórico"
  on public.history for delete
  using (auth.uid() = user_id);

drop trigger if exists history_updated_at on public.history;
create trigger history_updated_at
  before update on public.history
  for each row execute function public.set_updated_at();
