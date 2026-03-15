"use server";
import { cookies } from "next/headers";
import { getSearch } from "../spotify/data";

export async function handleSearch(
	prev: Record<string, string> | undefined,
	formData: FormData,
) {
	const token = (await cookies()).get("access_token")?.value;
	const q = formData.get("query")?.toString() || undefined;

	if (!q) return prev;

	const res = await getSearch({ q, type: "artist" }, token);

	return { ...prev, q, ...res };
}
