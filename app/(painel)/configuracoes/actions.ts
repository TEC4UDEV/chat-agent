"use server";

import { createClient } from "@/lib/supabase/server";
import type { ConfiguracoesCliente } from "@/types/database";
import { revalidatePath } from "next/cache";

export type ConfiguracoesFormState = {
  id?: string;
  nome: string;
  descricao: string;
  cor: string;
  modelo_ai: string;
  imagem_path: string;
  account: string;
  dominio: string;
};

type FormState = { error: string | null; success?: boolean };

export async function submitConfiguracoes(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const result = await saveConfiguracoes({
    id: (formData.get("id") as string) || undefined,
    nome: (formData.get("nome") as string) ?? "",
    descricao: (formData.get("descricao") as string) ?? "",
    cor: (formData.get("cor") as string) ?? "",
    modelo_ai: (formData.get("modelo_ai") as string) ?? "",
    imagem_path: (formData.get("imagem_path") as string) ?? "",
    account: (formData.get("account") as string) ?? "",
    dominio: (formData.get("dominio") as string) ?? "",
  });
  if (result.error) return { error: result.error };
  revalidatePath("/configuracoes");
  return { error: null, success: true };
}

export async function getConfiguracoes(): Promise<ConfiguracoesCliente | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("configuracoes_cliente")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getConfiguracoes] Supabase error:", error.message, error.code, error.details);
    return null;
  }

  return data;
}

export async function saveConfiguracoes(
  form: ConfiguracoesFormState
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Não autenticado" };

  const now = new Date().toISOString();
  const payload = {
    user_id: user.id,
    nome: form.nome || null,
    descricao: form.descricao || null,
    cor: form.cor || null,
    modelo_ai: form.modelo_ai || null,
    imagem_path: form.imagem_path || null,
    account: form.account || null,
    dominio: form.dominio || null,
    updated_at: now,
  };

  if (form.id) {
    const { error } = await supabase
      .from("configuracoes_cliente")
      .update(payload)
      .eq("id", form.id)
      .eq("user_id", user.id);
    return { error: error?.message ?? null };
  }

  const { error } = await supabase.from("configuracoes_cliente").insert(payload);
  return { error: error?.message ?? null };
}
