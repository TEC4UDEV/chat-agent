# Supabase

## Tabela `profiles`

Para criar a tabela `profiles` e as políticas RLS, execute o SQL da migration no **SQL Editor** do Supabase:

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard) → seu projeto → **SQL Editor**.
2. Abra o conteúdo de `migrations/20250209000000_create_profile.sql` e execute.

Ou, com Supabase CLI instalado:

```bash
supabase db push
```

## Estrutura da tabela `profiles`

| Coluna        | Tipo      | Descrição                          |
|---------------|-----------|------------------------------------|
| `id`          | uuid (PK) | Id do usuário (referência `auth.users`) |
| `email`       | text      | E-mail do usuário logado           |
| `account_name`| text      | Nome da conta (ex.: do Google)     |
| `creditos`    | integer   | Créditos (default 0)               |
| `created_at`  | timestamptz | Data de criação                 |
| `updated_at`  | timestamptz | Data da última atualização      |

O registro é criado ou atualizado automaticamente no login (e-mail ou Google).

---

## Storage – bucket `configuracoes-imagens`

Imagens das configurações do cliente são salvas neste bucket.

### 1. Criar o bucket no Dashboard

1. Acesse **Storage** → **New bucket**.
2. **Name:** `configuracoes-imagens`
3. Marque **Public bucket** (para leitura das imagens via URL).
4. (Opcional) File size limit: 5MB. Allowed MIME types: `image/*`.

### 2. Aplicar as políticas RLS

Execute no **SQL Editor** o conteúdo de `migrations/20250209200000_storage_configuracoes_imagens.sql`.

Cada usuário só pode enviar, atualizar e excluir arquivos na pasta com o próprio `user_id`. A leitura é pública para exibir as imagens.
