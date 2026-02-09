"use server";

import { createClient } from "@/lib/supabase/server";
import type { Thread } from "@/types/database";

const PAGE_SIZE = 10;

export type ThreadsResult = {
  threads: Thread[];
  total: number;
  page: number;
  totalPages: number;
};

export async function getThreads(page: number = 1): Promise<ThreadsResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { threads: [], total: 0, page: 1, totalPages: 0 };
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const [{ count: total }, { data: threads }] = await Promise.all([
    supabase
      .from("threads")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("threads")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(from, to),
  ]);

  const totalCount = total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.max(1, Math.min(page, totalPages));

  return {
    threads: (threads ?? []) as Thread[],
    total: totalCount,
    page: safePage,
    totalPages,
  };
}
