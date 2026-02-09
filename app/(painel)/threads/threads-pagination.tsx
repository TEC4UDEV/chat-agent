"use client";

import Link from "next/link";

export function ThreadsPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrev = prevPage >= 1;
  const hasNext = nextPage <= totalPages;

  return (
    <nav
      className="mt-6 flex items-center justify-center gap-2"
      aria-label="Paginação"
    >
      {hasPrev ? (
        <Link
          href={prevPage === 1 ? "/threads" : `/threads?page=${prevPage}`}
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
          href={`/threads?page=${nextPage}`}
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
