"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type RetiradaFilter = "all" | "entrada" | "saida";

export function HistoricoFiltros({
  retirada: initialRetirada,
  updated_at_de: initialDe,
  updated_at_ate: initialAte,
}: {
  retirada?: string;
  updated_at_de?: string;
  updated_at_ate?: string;
}) {
  const router = useRouter();
  const [retirada, setRetirada] = useState<RetiradaFilter>(
    (initialRetirada as RetiradaFilter) || "all"
  );
  const [updated_at_de, setUpdated_at_de] = useState(initialDe ?? "");
  const [updated_at_ate, setUpdated_at_ate] = useState(initialAte ?? "");

  const buildQuery = useCallback(
    (overrides: { page?: number; retirada?: string; updated_at_de?: string; updated_at_ate?: string } = {}) => {
      const r = overrides.retirada ?? retirada;
      const de = overrides.updated_at_de ?? updated_at_de;
      const ate = overrides.updated_at_ate ?? updated_at_ate;
      const params = new URLSearchParams();
      if (overrides.page && overrides.page > 1) params.set("page", String(overrides.page));
      if (r && r !== "all") params.set("retirada", r);
      if (de) params.set("updated_at_de", de);
      if (ate) params.set("updated_at_ate", ate);
      return params.toString();
    },
    [retirada, updated_at_de, updated_at_ate]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = buildQuery({ page: 1 });
    router.push(q ? `/historico?${q}` : "/historico");
  };

  const handleLimpar = () => {
    setRetirada("all");
    setUpdated_at_de("");
    setUpdated_at_ate("");
    router.push("/historico");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
      <div>
        <label htmlFor="retirada" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Tipo
        </label>
        <select
          id="retirada"
          value={retirada}
          onChange={(e) => setRetirada(e.target.value as RetiradaFilter)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
        >
          <option value="all">Todos</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </div>
      <div>
        <label htmlFor="updated_at_de" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Atualizado de
        </label>
        <input
          id="updated_at_de"
          type="date"
          value={updated_at_de}
          onChange={(e) => setUpdated_at_de(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
        />
      </div>
      <div>
        <label htmlFor="updated_at_ate" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Até
        </label>
        <input
          id="updated_at_ate"
          type="date"
          value={updated_at_ate}
          onChange={(e) => setUpdated_at_ate(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={handleLimpar}
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}

