import { createClient } from "@/lib/supabase/server";
import { getConfiguracoes } from "./actions";
import { ConfiguracoesAtual } from "./configuracoes-atual";
import { ConfiguracoesForm } from "./configuracoes-form";

export default async function ConfiguracoesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const config = await getConfiguracoes();

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Minhas configurações
      </h1>

      <div className="mb-8">
        <ConfiguracoesAtual config={config} />
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Editar configurações
        </h2>
        <ConfiguracoesForm
          userId={user.id}
          initial={{
            id: config?.id,
            nome: config?.nome ?? "",
            descricao: config?.descricao ?? "",
            cor: config?.cor ?? "",
            modelo_ai: config?.modelo_ai ?? "",
            imagem_path: config?.imagem_path ?? "",
          }}
        />
      </section>
    </div>
  );
}
