"use client";

import { useState } from "react";

const INCREMENTOS = [5, 10, 25, 50, 100];
const VALOR_MIN = 1;

function clamp(v: number) {
  return Math.max(VALOR_MIN, Math.round(v * 100) / 100);
}

function parseValor(v: string): number {
  const n = parseFloat(v.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function formatValor(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

export type PagamentoFormProps = {
  userId: string;
  payer: {
    email: string;
    name: string;
    surname: string;
  } | null;
};

export function PagamentoForm({ userId, payer }: PagamentoFormProps) {
  const [valorInput, setValorInput] = useState("10,00");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const valorNumerico = clamp(parseValor(valorInput) || VALOR_MIN);

  const add = (inc: number) => {
    const novo = clamp((parseValor(valorInput) || 0) + inc);
    setValorInput(formatValor(novo));
  };

  const sub = (dec: number) => {
    const novo = clamp((parseValor(valorInput) || 0) - dec);
    setValorInput(formatValor(novo));
  };

  const handleBlur = () => {
    const v = parseValor(valorInput);
    setValorInput(formatValor(v > 0 ? clamp(v) : VALOR_MIN));
  };

  const handlePagar = async () => {
    setErro(null);
    const finalValor = clamp(parseValor(valorInput));
    if (finalValor <= 0) {
      setErro("Informe um valor maior que zero.");
      return;
    }
    setValorInput(formatValor(finalValor));
    setLoading(true);
    try {
      const payerPayload = payer
        ? {
            email: payer.email,
            name: payer.name || undefined,
            surname: payer.surname || undefined,
          }
        : undefined;

      const res = await fetch("/api/checkout-pro/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalValor,
          title: "Créditos - Painel Chat",
          description: `Adição de R$ ${formatValor(finalValor)} em créditos`,
          user_id: userId,
          payer: payerPayload,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error ?? "Erro ao iniciar pagamento.");
        return;
      }
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      setErro("Resposta inválida do servidor.");
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Adicionar créditos
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Escolha o valor que deseja adicionar à sua conta.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-6">
        {/* Controle de valor */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
          <p className="mb-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Valor a adicionar
          </p>

          {/* Input principal com − e + */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => sub(1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>

            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                R$
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={valorInput}
                onChange={(e) => setValorInput(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === "Enter" && handleBlur()}
                className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-9 pr-3 text-center text-lg font-semibold text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50"
              />
            </div>

            <button
              type="button"
              onClick={() => add(1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Atalhos de incremento */}
          <div className="mt-4 flex flex-wrap gap-2">
            {INCREMENTOS.map((inc) => (
              <button
                key={inc}
                type="button"
                onClick={() => add(inc)}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/30 dark:hover:text-blue-300"
              >
                +{inc}
              </button>
            ))}
          </div>
        </div>

        {/* Dados do pagador */}
        {payer && (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800/30">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Pagamento identificado como
            </p>
            <p className="mt-0.5 text-sm text-zinc-700 dark:text-zinc-300">
              {[payer.name, payer.surname].filter(Boolean).join(" ") || payer.email}
              {(payer.name || payer.surname) && (
                <span className="ml-1 text-zinc-400 dark:text-zinc-500">
                  ({payer.email})
                </span>
              )}
            </p>
          </div>
        )}

        {/* Resumo e botão */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Total a pagar
            </span>
            <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              R$ {formatValor(valorNumerico)}
            </span>
          </div>
          <div className="mb-5 h-px bg-zinc-100 dark:bg-zinc-700" />

          {erro && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
              {erro}
            </p>
          )}

          <button
            type="button"
            onClick={handlePagar}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#009ee3] py-3 text-sm font-semibold text-white transition-opacity hover:bg-[#0088c4] disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Redirecionando…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Pagar com Mercado Pago
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
          Você será redirecionado ao ambiente seguro do Mercado Pago para
          concluir o pagamento com cartão, Pix ou boleto.
        </p>
      </div>
    </div>
  );
}
