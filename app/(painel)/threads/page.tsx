import { getThreads } from "./actions";
import { ThreadsPagination } from "./threads-pagination";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
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

function formatCusto(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(Number(value));
}

export default async function ThreadsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(String(pageParam), 10) || 1);
  const { threads, total, page: currentPage, totalPages } = await getThreads(page);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Threads
      </h1>

      {threads.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center dark:border-zinc-600 dark:bg-zinc-800/50">
          <p className="text-zinc-600 dark:text-zinc-400">
            Nenhuma thread encontrada.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            {total} {total === 1 ? "thread" : "threads"} no total
          </p>
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    Criado em
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    Custo
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    MCP Thread ID
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {threads.map((thread) => (
                  <tr
                    key={thread.id}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-700"
                  >
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {formatDate(thread.created_at)}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {formatCusto(thread.custo)}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400" title={thread.mcp_thread_id ?? undefined}>
                      {thread.mcp_thread_id ?? "—"}
                    </td>
                    <td className="max-w-[120px] truncate px-4 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400" title={thread.id}>
                      {thread.id.slice(0, 8)}…
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <ThreadsPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}
    </div>
  );
}
