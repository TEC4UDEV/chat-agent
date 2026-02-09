"use client";

import Link from "next/link";

export function HistoricoPagination({
  currentPage,
  totalPages,
  queryWithoutPage,
}: {
  currentPage: number;
  totalPages: number;
  queryWithoutPage: string;
}) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrev = prevPage >= 1;
  const hasNext = nextPage <= totalPages;
  const prefix = queryWithoutPage ? `&${queryWithoutPage}` : "";

  const prevHref = prevPage <= 1
    ? (queryWithoutPage ? `/historico?${queryWithoutPage}` : "/historico")
    : `/historico?page=${prevPage}${queryWithoutPage ? `&${queryWithoutPage}` : ""}`;
  const nextHref = `/historico?page=${nextPage}${queryWithoutPage ? `&${queryWithoutPage}` : ""}`;

  return (
    <nav
      className="mt-6 flex items-center justify-center gap-2"
      aria-label="Paginação"
    >
      {hasPrev ? (
        <Link
          href={prevHref}
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          Anterior
        </Link>
      ) : (
        <span
          className="cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
          aria-disabled
        >
          Anterior
        </span>
      )}

      <span className="px-3 text-sm text-zinc-600 dark:text-zinc-400">
        Página {currentPage} de {totalPages}
      </span>

      {hasNext ? (
        <Link
          href={nextHref}
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          Próxima
        </Link>
      ) : (
        <span
          className="cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
          aria-disabled
        >
          Próxima
        </span>
      )}
    </nav>
  );
}
