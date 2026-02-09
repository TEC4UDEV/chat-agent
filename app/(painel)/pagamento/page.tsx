export default function PagamentoPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Pagamento
        </h1>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
          Em construção
        </span>
      </div>

      <div className="mx-auto max-w-2xl space-y-8">
        {/* Placeholder: Formas de pagamento / Cartões */}
        <section>
          <h2 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Forma de pagamento
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-[1.6] items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-600 dark:bg-zinc-800/30"
              >
                <div className="text-center">
                  <div className="mx-auto mb-2 h-10 w-14 rounded border border-zinc-200 bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700" />
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Cartão {i}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Placeholder: Dados do cartão */}
        <section>
          <h2 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Dados do cartão
          </h2>
          <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800/50">
            <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-700/50" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-700/50" />
              <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-700/50" />
            </div>
            <div className="h-10 w-1/2 rounded-lg bg-zinc-100 dark:bg-zinc-700/50" />
          </div>
        </section>

        {/* Placeholder: Resumo / Finalizar */}
        <section>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
            <div className="mb-4 flex justify-between text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Valor</span>
              <span className="h-5 w-20 rounded bg-zinc-200 dark:bg-zinc-600" />
            </div>
            <div className="mb-6 h-px bg-zinc-100 dark:bg-zinc-700" />
            <button
              type="button"
              disabled
              className="w-full rounded-lg bg-zinc-200 py-3 text-sm font-medium text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400"
            >
              Em breve
            </button>
          </div>
        </section>

        <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
          Esta página está em desenvolvimento. Em breve você poderá adicionar créditos aqui.
        </p>
      </div>
    </div>
  );
}
