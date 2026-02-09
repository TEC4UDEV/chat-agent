"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

type Props = {
  nome: string;
  account: string;
  cor: string;
  descricao: string;
  imagem_path: string;
};

const DEFAULT_ACCOUNT = "minha-conta";
const DEFAULT_THEME = "#3B82F6";
const DEFAULT_BOT_NAME = "Assistente";
const DEFAULT_START = "Olá! Como posso ajudar você hoje?";
const DEFAULT_AVATAR =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233B82F6"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E';

function slugify(text: string): string {
  if (!text.trim()) return DEFAULT_ACCOUNT;
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || DEFAULT_ACCOUNT;
}

export function EmbedWidget({ nome, account, cor, descricao, imagem_path }: Props) {
  const [baseUrl, setBaseUrl] = useState("http://localhost:3000");
  const [copied, setCopied] = useState(false);

  const accountName = account.trim()
    ? account.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/^-|-$/g, "") || DEFAULT_ACCOUNT
    : slugify(nome);
  const themeColor = cor && /^#[0-9A-Fa-f]{6}$/.test(cor) ? cor : DEFAULT_THEME;
  const botName = nome.trim() || DEFAULT_BOT_NAME;
  const startMessage = descricao.trim() || DEFAULT_START;
  const botAvatar = imagem_path.trim() || DEFAULT_AVATAR;

  const scriptSrc = baseUrl.trim() ? `${baseUrl.replace(/\/$/, "")}/widget.js` : "";
  const apiUrl = baseUrl.trim() ? `${baseUrl.replace(/\/$/, "")}/chat` : "";

  const snippet = scriptSrc
    ? `<script src="${scriptSrc}"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof ChatWidget !== 'undefined') {
      new ChatWidget({
        accountName: '${accountName.replace(/'/g, "\\'")}',
        themeColor: '${themeColor}',
        botName: '${botName.replace(/'/g, "\\'")}',
        startMessage: '${startMessage.replace(/'/g, "\\'")}',
        apiUrl: '${apiUrl.replace(/'/g, "\\'")}',
        botAvatar: '${botAvatar.replace(/'/g, "\\'")}'
      });
    }
  });
</script>`
    : "";

  const previewUrl = useMemo(() => {
    if (!scriptSrc) return null;
    const params = new URLSearchParams({
      scriptUrl: scriptSrc,
      apiUrl: apiUrl || scriptSrc.replace(/\/widget\.js$/, "/chat"),
      accountName,
      themeColor,
      botName,
      startMessage,
    });
    if (botAvatar) params.set("botAvatar", botAvatar);
    return `/preview?${params.toString()}`;
  }, [scriptSrc, apiUrl, accountName, themeColor, botName, startMessage, botAvatar]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select and suggest Ctrl+C
    }
  }, [snippet]);

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Preview do widget
        </h2>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          Teste o widget com as configurações atuais. Informe a URL base do servidor do chat (ex.: servidor do chat-bun).
        </p>
        <div className="mb-4">
          <label htmlFor="embed-base-url" className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
            URL base do widget
          </label>
          <input
            id="embed-base-url"
            type="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="http://localhost:3000"
            className="w-full max-w-md rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>
        {previewUrl ? (
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <span>Abrir preview em nova aba</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              O widget será carregado com nome, cor, descrição e imagem atuais.
            </p>
          </div>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Preencha a URL base acima para gerar o link do preview.
          </p>
        )}
      </div>

      {/* Código embed */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
        <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Código embed do widget
        </h2>
        <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          Cole o código abaixo antes do <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-700">&lt;/body&gt;</code> do seu site. O widget usa as configurações salvas (nome, account, cor, descrição, imagem).
        </p>
        {snippet ? (
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-xs text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
              <code>{snippet}</code>
            </pre>
            <button
              type="button"
              onClick={copyToClipboard}
              className="absolute right-2 top-2 rounded-md bg-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-500"
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Preencha a URL base do widget acima para gerar o código.
          </p>
        )}
      </div>
    </div>
  );
}
