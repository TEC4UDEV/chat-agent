export type Profile = {
  id: string;
  email: string;
  account_name: string;
  creditos: number;
  created_at: string;
  updated_at: string;
};

export type ConfiguracoesCliente = {
  id: string;
  user_id: string | null;
  nome: string | null;
  descricao: string | null;
  cor: string | null;
  modelo_ai: string | null;
  imagem_path: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type Thread = {
  id: string;
  user_id: string | null;
  custo: number | null;
  created_at: string | null;
  mcp_thread_id: string | null;
  updated_at: string | null;
};
