import Link from "next/link";

export default function PagamentoPendentePage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-800 dark:bg-amber-950/30">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
          <svg
            className="h-7 w-7 text-amber-600 dark:text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Pagamento pendente
        </h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Seu pagamento está em análise (ex.: boleto ou transferência). Os
          créditos serão creditados assim que o valor for confirmado.
        </p>
        <Link
          href="/pagamento"
          className="inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
        >
          Voltar ao pagamento
        </Link>
        <span className="mx-2 text-zinc-400">ou</span>
        <Link
          href="/"
          className="text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
        >
          Ir para o início
        </Link>
      </div>
    </div>
  );
}
