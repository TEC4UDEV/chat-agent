-- Tabela threads
create table if not exists public.threads (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  custo numeric(10, 4) null,
  created_at timestamptz null default now(),
  mcp_thread_id text null,
  updated_at timestamptz null,
  constraint threads_pkey primary key (id),
  constraint threads_user_id_fkey foreign key (user_id) references public.profiles (id) on delete cascade
) tablespace pg_default;

create index if not exists threads_user_id_idx on public.threads (user_id);
create index if not exists threads_created_at_idx on public.threads (created_at desc);

-- RLS: usuário só acessa as próprias threads
alter table public.threads enable row level security;

create policy "Usuários podem ver as próprias threads"
  on public.threads for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir as próprias threads"
  on public.threads for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar as próprias threads"
  on public.threads for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Usuários podem excluir as próprias threads"
  on public.threads for delete
  using (auth.uid() = user_id);

-- Trigger para updated_at
drop trigger if exists threads_updated_at on public.threads;
create trigger threads_updated_at
  before update on public.threads
  for each row execute function public.set_updated_at();
