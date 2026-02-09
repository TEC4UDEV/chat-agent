import type { SupabaseClient } from "@supabase/supabase-js";

export const BUCKET_CONFIGURACOES_IMAGENS = "configuracoes-imagens";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function isAllowedImageType(type: string): boolean {
  return ALLOWED_TYPES.includes(type) || type.startsWith("image/");
}

export function isAllowedImageSize(size: number): boolean {
  return size <= MAX_SIZE_BYTES;
}

/**
 * Faz upload de um arquivo para o bucket configuracoes-imagens na pasta do usuário.
 * Funciona no client (browser) e no server.
 * Retorna a URL pública para salvar em imagem_path.
 */
export async function uploadConfiguracoesImage(
  supabase: SupabaseClient,
  userId: string,
  file: File
): Promise<{ url: string; path: string } | { error: string }> {
  if (!isAllowedImageType(file.type)) {
    return { error: "Tipo de arquivo não permitido. Use JPEG, PNG, GIF ou WebP." };
  }
  if (!isAllowedImageSize(file.size)) {
    return { error: "Arquivo muito grande. Máximo 5MB." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${userId}/${safeName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_CONFIGURACOES_IMAGENS)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) return { error: error.message };

  const { data: urlData } = supabase.storage
    .from(BUCKET_CONFIGURACOES_IMAGENS)
    .getPublicUrl(data.path);
  return { url: urlData.publicUrl, path: data.path };
}
