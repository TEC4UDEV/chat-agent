"use client";

import { createClient } from "@/lib/supabase/client";
import { uploadConfiguracoesImage } from "@/lib/supabase/storage";
import { submitConfiguracoes, type ConfiguracoesFormState } from "./actions";
import { useActionState, useRef, useState } from "react";

const initialState = { error: null as string | null, success: false };

export function ConfiguracoesForm({
  userId,
  initial,
}: {
  userId: string;
  initial: ConfiguracoesFormState & { id?: string };
}) {
  const [state, formAction, isPending] = useActionState(
    submitConfiguracoes,
    initialState
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(initial.imagem_path || null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploadError(null);
    const form = e.currentTarget;
    const fileInput = form.querySelector<HTMLInputElement>('input[name="imagem_file"]');
    const imagemPathInput = form.querySelector<HTMLInputElement>('input[name="imagem_path"]');

    if (fileInput?.files?.[0] && imagemPathInput) {
      e.preventDefault();
      const file = fileInput.files[0];
      const supabase = createClient();
      const result = await uploadConfiguracoesImage(supabase, userId, file);
      if ("error" in result) {
        setUploadError(result.error);
        return;
      }
      imagemPathInput.value = result.url;
      fileInput.value = "";
      setPreviewUrl(result.url);
      form.requestSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewUrl(URL.createObjectURL(file));
    else setPreviewUrl(initial.imagem_path || null);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="max-w-xl space-y-5">
      {initial.id && <input type="hidden" name="id" value={initial.id} readOnly />}
      <input type="hidden" name="imagem_path" defaultValue={initial.imagem_path} />
      {state.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {state.error}
        </div>
      )}
      {uploadError && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {uploadError}
        </div>
      )}
      {state.success && !state.error && (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
          Configurações salvas.
        </div>
      )}

      <div>
        <label htmlFor="nome" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          defaultValue={initial.nome}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="Nome da configuração"
        />
      </div>

      <div>
        <label htmlFor="account" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Account
        </label>
        <input
          id="account"
          name="account"
          type="text"
          defaultValue={initial.account}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="ex: minha-loja (usado no widget)"
        />
      </div>

      <div>
        <label htmlFor="dominio" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Domínio do site
        </label>
        <input
          id="dominio"
          name="dominio"
          type="text"
          defaultValue={initial.dominio}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="ex: www.minhaloja.com.br"
        />
      </div>

      <div>
        <label htmlFor="descricao" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Mensagem inicial do chat bot
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={3}
          defaultValue={initial.descricao}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="Descrição"
        />
      </div>

      <div>
        <label htmlFor="cor_text" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Cor
        </label>
        <div className="flex items-center gap-2">
          <input
            id="cor_picker"
            type="color"
            defaultValue={initial.cor || "#3b82f6"}
            className="h-10 w-14 cursor-pointer rounded border border-zinc-300 dark:border-zinc-600"
            onChange={(e) => {
              const text = document.getElementById("cor_text") as HTMLInputElement;
              if (text) text.value = e.target.value;
            }}
          />
          <input
            id="cor_text"
            name="cor"
            type="text"
            defaultValue={initial.cor || "#3b82f6"}
            onChange={(e) => {
              const picker = document.getElementById("cor_picker") as HTMLInputElement;
              if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value) && picker) picker.value = e.target.value;
            }}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            placeholder="#3b82f6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="modelo_ai" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Modelo de IA
        </label>
        <input
          id="modelo_ai"
          name="modelo_ai"
          type="text"
          defaultValue={initial.modelo_ai}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="ex: gpt-4, Claude, etc."
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Imagem
        </label>
        <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
          JPEG, PNG, GIF ou WebP. Máximo 5MB.
        </p>
        {previewUrl && (
          <div className="mb-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 w-32 rounded-lg border border-zinc-200 object-cover dark:border-zinc-600"
            />
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          name="imagem_file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 file:mr-2 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-sm file:font-medium file:text-blue-700 dark:border-zinc-600 dark:bg-zinc-800 dark:file:bg-blue-900/30 dark:file:text-blue-300"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Salvando…" : "Salvar"}
      </button>
    </form>
  );
}
