import Link from "next/link";
import { getThreadDetail } from "../actions";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("pt-BR", {
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

export default async function ThreadDetailPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  const thread = await getThreadDetail(threadId);

  if (!thread) {
    return (
      <div className="p-6">
        <Link
          href="/threads"
          className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          ← Voltar às threads
        </Link>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-8 text-center dark:border-amber-800 dark:bg-amber-900/10">
          <p className="text-amber-800 dark:text-amber-200">
            Thread não encontrada ou indisponível.
          </p>
          <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
            Verifique se o ID está correto e se o servidor do chat está acessível.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/threads"
            className="mb-2 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            ← Voltar às threads
          </Link>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Conversa
          </h1>
          <p className="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {thread.id}
          </p>
        </div>
        <dl className="flex gap-6 text-sm">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Criado</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatDate(thread.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Atualizado</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatDate(thread.updatedAt)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="space-y-4">
        {thread.messages.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center dark:border-zinc-600 dark:bg-zinc-800/50">
            <p className="text-zinc-600 dark:text-zinc-400">
              Nenhuma mensagem nesta thread.
            </p>
          </div>
        ) : (
          thread.messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-xl border px-4 py-3 ${
                msg.role === "user"
                  ? "ml-0 mr-8 border-zinc-200 bg-white dark:border-zinc-600 dark:bg-zinc-800"
                  : "ml-8 mr-0 border-blue-200 bg-blue-50/80 dark:border-blue-900/50 dark:bg-blue-950/30"
              }`}
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {msg.role === "user" ? "Usuário" : "Assistente"}
              </p>
              <div className="whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
