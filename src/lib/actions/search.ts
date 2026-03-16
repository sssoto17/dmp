"use server";
import { getSearch } from "../spotify/data";

export async function handleSearch(
  prev: Record<string, string> | undefined,
  formData: FormData,
) {
  const q = formData.get("query")?.toString();

  if (!q) return prev;

  const res = await getSearch({ q, type: "artist" });

  return { ...prev, q, ...res };
}
