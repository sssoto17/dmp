import "server-only";

import { SupabaseClient } from "@supabase/supabase-js";

// OLD || ASYNC FUNCTIONS

import { SpotifyCredentials, SpotifyPayload } from "./schema";
import { encode } from "./utils";

const {
  SPOTIFY_API_TOKEN: url,
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
} = process.env;

const headers: Record<string, string> = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Basic ${encode(client_id, client_secret)}`,
};

// CLIENT CREDENTIALS
export async function getAnonProviderToken(): Promise<SpotifyCredentials> {
  const payload: SpotifyPayload = {
    grant_type: "client_credentials",
  };

  return await fetch(url, {
    method: "POST",
    headers,
    body: new URLSearchParams(payload as Record<string, string>),
  }).then((res) => res.json());
}

// AUTHORIZATION CODE
export async function refreshAuthProviderToken(
  supabase: SupabaseClient,
): Promise<SpotifyCredentials> {
  const payload: SpotifyPayload = {
    grant_type: "refresh_token",
  };

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!error && session?.provider_refresh_token) {
    payload.refresh_token = session.provider_refresh_token;
  }

  return await fetch(url, {
    method: "POST",
    headers,
    body: new URLSearchParams(payload as Record<string, string>),
  }).then((res) => res.json());
}
