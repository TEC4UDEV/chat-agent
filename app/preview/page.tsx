"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    ChatWidget?: new (config: Record<string, unknown>) => { destroy?: () => void };
    chatWidgetInstance?: { destroy?: () => void };
  }
}

function PreviewContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const loadedRef = useRef(false);
  const isEmbed = searchParams.get("embed") === "1";

  const scriptUrl = searchParams.get("scriptUrl");
  const apiUrl = searchParams.get("apiUrl");
  const accountName = searchParams.get("accountName") ?? "minha-conta";
  const themeColor = searchParams.get("themeColor") ?? "#3B82F6";
  const botName = searchParams.get("botName") ?? "Assistente";
  const startMessage = searchParams.get("startMessage") ?? "Olá! Como posso ajudar você hoje?";
  const botAvatar = searchParams.get("botAvatar") ?? "";

  useEffect(() => {
    if (!scriptUrl || loadedRef.current) return;

    loadedRef.current = true;
    setStatus("loading");
    setErrorMsg(null);

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      if (typeof window.ChatWidget !== "undefined") {
        try {
          const config: Record<string, string> = {
            accountName,
            themeColor,
            botName,
            startMessage,
            apiUrl: apiUrl || scriptUrl.replace(/\/widget\.js$/, "/chat"),
          };
          if (botAvatar) config.botAvatar = botAvatar;
          window.chatWidgetInstance = new window.ChatWidget!(config);
          setStatus("ready");
        } catch (e) {
          setErrorMsg(e instanceof Error ? e.message : "Erro ao iniciar o widget");
          setStatus("error");
        }
      } else {
        setErrorMsg("ChatWidget não encontrado no script.");
        setStatus("error");
      }
    };
    script.onerror = () => {
      setErrorMsg("Falha ao carregar o script do widget. Verifique a URL e CORS.");
      setStatus("error");
    };
    document.body.appendChild(script);

    return () => {
      if (window.chatWidgetInstance?.destroy) {
        window.chatWidgetInstance.destroy();
      }
      loadedRef.current = false;
    };
  }, [scriptUrl, apiUrl, accountName, themeColor, botName, startMessage, botAvatar]);

  if (!scriptUrl) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 p-8 dark:border-zinc-600 dark:bg-zinc-800/50">
        <p className="mb-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Informe a <strong>URL base do widget</strong> na página de configurações para carregar o preview.
        </p>
        <Link
          href="/configuracoes"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Ir para configurações
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-red-200 bg-red-50/50 p-8 dark:border-red-900/30 dark:bg-red-900/10">
        <p className="mb-2 text-center text-sm font-medium text-red-800 dark:text-red-300">
          Erro ao carregar o widget
        </p>
        <p className="mb-4 text-center text-xs text-red-600 dark:text-red-400">
          {errorMsg}
        </p>
        <Link
          href="/configuracoes"
          className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:border-red-700 dark:bg-red-900/20 dark:text-red-300"
        >
          Voltar às configurações
        </Link>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-600 dark:bg-zinc-800/50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-400" />
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Carregando widget…</p>
      </div>
    );
  }

  // Embed: só o widget (conteúdo mínimo). Fora do embed: aviso discreto.
  return (
    <div className="min-h-[320px]">
      {!isEmbed && (
        <p className="p-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
          O widget aparece no canto da tela. Clique no botão de chat para testar.
        </p>
      )}
    </div>
  );
}

function PreviewContentWrapper() {
  const searchParams = useSearchParams();
  const isEmbed = searchParams.get("embed") === "1";

  if (isEmbed) {
    return (
      <div className="min-h-full min-w-full bg-transparent">
        <Suspense fallback={<div className="min-h-[320px] animate-pulse " />}>
          <PreviewContent />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/configuracoes"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          ← Configurações
        </Link>
      </div>
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Preview do widget
      </h1>
      <Suspense fallback={<div className="min-h-[320px] animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />}>
        <PreviewContent />
      </Suspense>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-zinc-50 dark:bg-zinc-900" />}>
      <PreviewContentWrapper />
    </Suspense>
  );
}
