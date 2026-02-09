-- Tabela configuracoes_cliente: configurações por usuário (user_id = profiles.id)
create table if not exists public.configuracoes_cliente (
  id uuid not null default gen_random_uuid(),
  user_id uuid null,
  nome text null,
  descricao text null,
  cor text null,
  modelo_ai text null,
  imagem_path text null,
  created_at timestamptz null default now(),
  updated_at timestamptz null,
  constraint configuracoes_cliente_pkey primary key (id),
  constraint configuracoes_cliente_user_id_fkey foreign key (user_id) references public.profiles (id) on delete cascade
) tablespace pg_default;

create index if not exists configuracoes_cliente_user_id_idx on public.configuracoes_cliente (user_id);

-- RLS: usuário só acessa as próprias configurações
alter table public.configuracoes_cliente enable row level security;

create policy "Usuários podem ver as próprias configurações"
  on public.configuracoes_cliente for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir as próprias configurações"
  on public.configuracoes_cliente for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar as próprias configurações"
  on public.configuracoes_cliente for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Usuários podem excluir as próprias configurações"
  on public.configuracoes_cliente for delete
  using (auth.uid() = user_id);

-- Trigger para atualizar updated_at
drop trigger if exists configuracoes_cliente_updated_at on public.configuracoes_cliente;
create trigger configuracoes_cliente_updated_at
  before update on public.configuracoes_cliente
  for each row execute function public.set_updated_at();
