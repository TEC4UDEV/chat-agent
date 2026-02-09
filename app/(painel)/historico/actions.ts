"use server";

import { createClient } from "@/lib/supabase/server";
import type { History } from "@/types/database";

const PAGE_SIZE = 10;

export type HistoryFilters = {
  retirada?: "all" | "entrada" | "saida";
  updated_at_de?: string; // ISO date (YYYY-MM-DD)
  updated_at_ate?: string;
};

export type HistoryResult = {
  items: History[];
  total: number;
  page: number;
  totalPages: number;
};

export async function getHistory(
  page: number = 1,
  filters: HistoryFilters = {}
): Promise<HistoryResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { items: [], total: 0, page: 1, totalPages: 0 };
  }

  let query = supabase
    .from("history")
    .select("*", { count: "exact" })
    .eq("user_id", user.id);

  if (filters.retirada === "entrada") {
    query = query.or("retirada.eq.false,retirada.is.null");
  } else if (filters.retirada === "saida") {
    query = query.eq("retirada", true);
  }

  if (filters.updated_at_de) {
    query = query.gte("updated_at", `${filters.updated_at_de}T00:00:00.000Z`);
  }
  if (filters.updated_at_ate) {
    query = query.lte("updated_at", `${filters.updated_at_ate}T23:59:59.999Z`);
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: items, count: total, error } = await query
    .order("updated_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("[getHistory]", error.message);
    return { items: [], total: 0, page: 1, totalPages: 0 };
  }

  const totalCount = total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.max(1, Math.min(page, totalPages));

  return {
    items: (items ?? []) as History[],
    total: totalCount,
    page: safePage,
    totalPages,
  };
}
