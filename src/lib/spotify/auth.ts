const {
	SPOTIFY_API_TOKEN: url,
	SPOTIFY_REDIRECT_URI: redirect_uri,
	SPOTIFY_CLIENT_ID: client_id,
	SPOTIFY_CLIENT_SECRET: client_secret,
} = process.env;
import { Buffer } from "node:buffer";

type Credentials = {
	access_token: string;
	refresh_token: string;
	token_type: string;
	scope: string;
	expires_in: number;
	error: string;
	error_description: string;
};

const headers: Record<string, string> = {
	"Content-Type": "application/x-www-form-urlencoded",
	Authorization: `Basic ${encode(client_id, client_secret)}`,
};

export async function get_auth_token(code: string) {
	const payload = {
		grant_type: "authorization_code",
		code,
		redirect_uri,
	};

	return (await fetch(url, {
		method: "POST",
		headers,
		body: new URLSearchParams(payload),
	}).then((res) => res.json())) as Credentials;
}

export async function refresh_auth_token(refresh_token: string) {
	console.log("in function: ", refresh_token);
	const payload = {
		grant_type: "refresh_token",
		refresh_token,
	};

	return (await fetch(url, {
		method: "POST",
		headers,
		body: new URLSearchParams(payload),
	}).then((res) => res.json())) as Credentials;
}

export async function get_client_token() {
	const payload = {
		grant_type: "client_credentials",
	};

	return (await fetch(url, {
		method: "POST",
		headers,
		body: new URLSearchParams(payload),
	}).then((res) => res.json())) as Credentials;
}

function encode(id: string, secret: string): string {
	const str = `${id}:${secret}`;
	return Buffer.from(str).toString("base64");
}
