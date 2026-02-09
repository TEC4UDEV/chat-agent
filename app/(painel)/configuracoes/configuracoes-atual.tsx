import type { ConfiguracoesCliente } from "@/types/database";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
}

export function ConfiguracoesAtual({ config }: { config: ConfiguracoesCliente | null }) {
  if (!config?.id) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 dark:border-zinc-600 dark:bg-zinc-800/50">
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Você ainda não tem configurações salvas. Preencha o formulário abaixo para criar.
        </p>
      </div>
    );
  }

  const hasAny =
    config.nome ||
    config.descricao ||
    config.cor ||
    config.modelo_ai ||
    config.imagem_path;

  if (!hasAny) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 dark:border-zinc-600 dark:bg-zinc-800/50">
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Configurações criadas. Edite abaixo para preencher os campos.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Configurações atuais
      </h2>
      <dl className="space-y-4">
        {config.nome && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Nome
            </dt>
            <dd className="mt-0.5 text-zinc-900 dark:text-zinc-100">{config.nome}</dd>
          </div>
        )}
        {config.descricao && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Descrição
            </dt>
            <dd className="mt-0.5 whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">
              {config.descricao}
            </dd>
          </div>
        )}
        {config.cor && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Cor
            </dt>
            <dd className="mt-1 flex items-center gap-2">
              <span
                className="h-8 w-8 shrink-0 rounded-lg border border-zinc-200 dark:border-zinc-600"
                style={{ backgroundColor: config.cor }}
                aria-hidden
              />
              <span className="text-zinc-900 dark:text-zinc-100">{config.cor}</span>
            </dd>
          </div>
        )}
        {config.modelo_ai && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Modelo de IA
            </dt>
            <dd className="mt-0.5 text-zinc-900 dark:text-zinc-100">{config.modelo_ai}</dd>
          </div>
        )}
        {config.imagem_path && (
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Imagem
            </dt>
            <dd className="mt-1">
              <img
                src={config.imagem_path}
                alt="Configuração"
                className="h-24 w-24 rounded-lg border border-zinc-200 object-cover dark:border-zinc-600"
              />
            </dd>
          </div>
        )}
        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-700">
          <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Última atualização
          </dt>
          <dd className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            {formatDate(config.updated_at ?? config.created_at)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
