"use client";

import { useCallback, useState } from "react";

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

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [snippet]);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/80 sm:p-8">
      <h2 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Código para embed no seu site
      </h2>
      <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
        Cole o código abaixo antes do <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-700">&lt;/body&gt;</code> do seu site. Use a URL base do servidor do chat (ex.: servidor chat-bun).
      </p>
      {snippet ? (
        <div className="relative">
          <pre className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 pr-24 text-xs text-zinc-800 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200">
            <code>{snippet}</code>
          </pre>
          <button
            type="button"
            onClick={copyToClipboard}
            className="absolute right-3 top-3 rounded-lg bg-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-500"
          >
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Informe a URL base acima para gerar o código.
        </p>
      )}
    </div>
  );
}
