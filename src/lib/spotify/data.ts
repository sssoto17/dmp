import { ParamValue } from "next/dist/server/request/params";

const { SPOTIFY_API_URL: url } = process.env;

async function get(endpoint: string, token: string | undefined) {
	return await fetch(endpoint, {
		headers: {
			Authorization: "Bearer " + token,
		},
	}).then((res) => res.json());
}

export async function getArtist(
	id: string | ParamValue,
	token: string | undefined,
) {
	const artist = await get(`${url}/artists/${id}`, token);
	const albums = await get(`${url}/artists/${id}/albums`, token);
	return { ...artist, discography: albums };
}

export async function getAlbum(
	id: string | ParamValue,
	token: string | undefined,
) {
	return await get(`${url}/albums/${id}`, token);
}

export async function getSearch(
	q: Record<string, string>,
	token: string | undefined,
) {
	const query = new URLSearchParams(q).toString();
	return await get(`${url}/search?${query}`, token);
}
