import { createClient } from "@/lib/supabase/server";
import { getConfiguracoes } from "./actions";
import { ConfiguracoesForm } from "./configuracoes-form";
import { ConfiguracoesPreview } from "./configuracoes-preview";
import { EmbedWidget } from "./embed-widget";

export default async function ConfiguracoesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const config = await getConfiguracoes();

  if (!user) return null;

  const initial = {
    id: config?.id,
    nome: config?.nome ?? "",
    descricao: config?.descricao ?? "",
    cor: config?.cor ?? "",
    modelo_ai: config?.modelo_ai ?? "",
    imagem_path: config?.imagem_path ?? "",
    account: config?.account ?? "",
    dominio: config?.dominio ?? "",
  };

  const previewProps = {
    nome: config?.nome ?? "",
    account: config?.account ?? "",
    cor: config?.cor ?? "",
    descricao: config?.descricao ?? "",
    imagem_path: config?.imagem_path ?? "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100/80 dark:from-zinc-900 dark:to-zinc-900/95">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Configurações
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Personalize o widget de chat e veja o preview em tempo real ao lado.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,400px]">
          {/* Formulário */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/80 sm:p-8">
            <ConfiguracoesForm userId={user.id} initial={initial} />
          </div>

          {/* Preview do widget */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <ConfiguracoesPreview {...previewProps} />
          </aside>
        </div>

        {/* Código embed */}
        <section className="mt-10">
          <EmbedWidget {...previewProps} />
        </section>
      </div>
    </div>
  );
}
