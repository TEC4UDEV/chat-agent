import Link from "next/link";

export default function PagamentoErroPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950/30">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
          <svg
            className="h-7 w-7 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Pagamento não concluído
        </h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          O pagamento foi recusado ou cancelado. Você pode tentar novamente
          escolhendo outra forma de pagamento.
        </p>
        <Link
          href="/pagamento"
          className="inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Tentar novamente
        </Link>
        <span className="mx-2 text-zinc-400">ou</span>
        <Link
          href="/"
          className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
        >
          Ir para o início
        </Link>
      </div>
    </div>
  );
}
