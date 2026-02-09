import { Suspense } from "react";
import { getHistory } from "./actions";
import { HistoricoFiltros } from "./historico-filtros";
import { HistoricoPagination } from "./historico-pagination";

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

function formatValor(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}

export default async function HistoricoPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    retirada?: string;
    updated_at_de?: string;
    updated_at_ate?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(String(params.page), 10) || 1);
  const filters = {
    retirada: params.retirada as "all" | "entrada" | "saida" | undefined,
    updated_at_de: params.updated_at_de,
    updated_at_ate: params.updated_at_ate,
  };
  const { items, total, page: currentPage, totalPages } = await getHistory(page, filters);

  const queryWithoutPage = new URLSearchParams();
  if (filters.retirada && filters.retirada !== "all") queryWithoutPage.set("retirada", filters.retirada);
  if (filters.updated_at_de) queryWithoutPage.set("updated_at_de", filters.updated_at_de);
  if (filters.updated_at_ate) queryWithoutPage.set("updated_at_ate", filters.updated_at_ate);
  const queryString = queryWithoutPage.toString();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Histórico de transações
      </h1>

      <Suspense fallback={<div className="mb-6 h-20 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />}>
        <HistoricoFiltros
          retirada={params.retirada}
          updated_at_de={params.updated_at_de}
          updated_at_ate={params.updated_at_ate}
        />
      </Suspense>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center dark:border-zinc-600 dark:bg-zinc-800/50">
          <p className="text-zinc-600 dark:text-zinc-400">
            Nenhuma transação encontrada.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            {total} {total === 1 ? "transação" : "transações"}
          </p>
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    Data pagamento
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    Atualizado em
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    Tipo
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50 text-right">
                    Valor
                  </th>
                  <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                    Thread ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-700"
                  >
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {formatDate(row.data_pagamento)}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {formatDate(row.updated_at)}
                    </td>
                    <td className="px-4 py-3">
                      {row.retirada ? (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          Saída
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Entrada
                        </span>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${row.retirada ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                      {row.valor != null ? (row.retirada ? "-" : "+") : ""}
                      {formatValor(row.valor)}
                    </td>
                    <td className="max-w-[140px] truncate px-4 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400" title={row.thread_id ?? undefined}>
                      {row.thread_id ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <HistoricoPagination
              currentPage={currentPage}
              totalPages={totalPages}
              queryWithoutPage={queryString}
            />
          )}
        </>
      )}
    </div>
  );
}
