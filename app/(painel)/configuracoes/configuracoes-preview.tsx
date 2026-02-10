"use client";

import { useMemo, useState } from "react";

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

type Props = {
  nome: string;
  account: string;
  cor: string;
  descricao: string;
  imagem_path: string;
};

export function ConfiguracoesPreview({ nome, account, cor, descricao, imagem_path }: Props) {
  const [baseUrl, setBaseUrl] = useState("http://localhost:3000");

  const accountName = account.trim()
    ? account.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/^-|-$/g, "") || DEFAULT_ACCOUNT
    : slugify(nome);
  const themeColor = cor && /^#[0-9A-Fa-f]{6}$/.test(cor) ? cor : DEFAULT_THEME;
  const botName = nome.trim() || DEFAULT_BOT_NAME;
  const startMessage = descricao.trim() || DEFAULT_START;
  const botAvatar = imagem_path.trim() || DEFAULT_AVATAR;

  const scriptSrc = baseUrl.trim() ? `${baseUrl.replace(/\/$/, "")}/widget.js` : "";
  const apiUrl = baseUrl.trim() ? `${baseUrl.replace(/\/$/, "")}/chat` : "";

  const previewUrl = useMemo(() => {
    if (!scriptSrc) return null;
    const params = new URLSearchParams({
      scriptUrl: scriptSrc,
      apiUrl: apiUrl || scriptSrc.replace(/\/widget\.js$/, "/chat"),
      accountName,
      themeColor,
      botName,
      startMessage,
      embed: "1",
    });
    if (botAvatar) params.set("botAvatar", botAvatar);
    return `/preview?${params.toString()}`;
  }, [scriptSrc, apiUrl, accountName, themeColor, botName, startMessage, botAvatar]);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800/80">
      <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-700">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          Preview do widget
        </h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Altere os campos ao lado e salve para ver as mudanças aqui.
        </p>
      </div>
      <div className="relative flex-1 min-h-[600px]">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title="Preview do widget de chat"
            className="absolute inset-0 h-full w-full rounded-b-2xl border-0 bg-zinc-100 dark:bg-zinc-900"
          />
        ) : (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-b-2xl bg-zinc-100 px-4 dark:bg-zinc-900/50">
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Informe a URL base do widget acima para carregar o preview.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
