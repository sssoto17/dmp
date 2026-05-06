"use server";
import Spotify from "../Spotify";

export async function handleSearch(
  test?: string,
  // prev: Record<string, string> | undefined,
  // formData: FormData,
) {
  // if (signal?.aborted) return "abort";
  // const q = formData.get("search")?.toString();

  // console.log("server:");
  // return signal;

  // if (!q) return prev;

  // // TODO: Filter for artist, albums, tracks
  const spotify = await Spotify.create();
  const res = await spotify.search(test as string);

  return res?.artists?.items;
  // return { ...prev, q, ...res };
}
