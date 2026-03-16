import { ParamValue } from "next/dist/server/request/params";
import { get } from "./utils";

const { SPOTIFY_API_URL: url } = process.env;

export async function getArtist(id: string | ParamValue) {
  const artist = await get(`${url}/artists/${id}`);
  const albums = await get(`${url}/artists/${id}/albums`);
  return { ...artist, discography: albums };
}

export async function getAlbum(id: string | ParamValue) {
  return await get(`${url}/albums/${id}`);
}

export async function getSearch(q: Record<string, string>) {
  const query = new URLSearchParams(q).toString();
  return await get(`${url}/search?${query}`);
}

export async function testOAuth() {
  // const cookieStore = await cookies();

  //   console.log(cookieStore.get("oauth_provider_token"));
  // if (!token) {
  //   const rf = cookieStore.get("oauth_provider_refresh_token")?.value;

  //   const { access_token, expires_in, error } = await refreshProviderToken(rf);

  //   if (!error) {
  //     //   cookieStore.set("oauth_provider_token", access_token, {
  //     //     maxAge: expires_in,
  //     //   });

  //     return await get(`${url}/me`, token);
  //   }
  // } else

  return await get(`${url}/me`);
}
