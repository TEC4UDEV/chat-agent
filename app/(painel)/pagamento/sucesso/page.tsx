import Link from "next/link";

export default function PagamentoSucessoPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-md rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-950/30">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
          <svg
            className="h-7 w-7 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Pagamento aprovado
        </h1>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Obrigado! Seu pagamento foi processado com sucesso. Os créditos serão
          creditados em breve.
        </p>
        <Link
          href="/pagamento"
          className="inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
        >
          Voltar ao pagamento
        </Link>
        <span className="mx-2 text-zinc-400">ou</span>
        <Link
          href="/"
          className="text-sm font-medium text-green-600 hover:underline dark:text-green-400"
        >
          Ir para o início
        </Link>
      </div>
    </div>
  );
}
