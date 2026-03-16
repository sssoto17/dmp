import {
  SignInWithPasswordCredentials,
  SignOutScope,
} from "@supabase/supabase-js";
import { cookies } from "next/headers";
import createClient from "../supabase/server";

// TODO: Link regular user with Spotify account
// Possibly link several emails to same account + Spotify
export async function signIn(user: SignInWithPasswordCredentials) {
  const supabase = await createClient();

  return await supabase.auth.signInWithPassword(user);
}

export async function authorizeSpotify() {
  const supabase = await createClient();

  return await supabase.auth.signInWithOAuth({
    provider: "spotify",
    options: {
      redirectTo: "http://127.0.0.1:3000/auth/callback",
      scopes:
        "user-read-email user-read-private user-top-read user-read-playback-position streaming user-read-currently-playing user-modify-playback-state user-read-playback-state",
    },
  });
}

export async function signOut(scope: SignOutScope) {
  const store = await cookies();
  const supabase = await createClient();

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") {
      store.delete("oauth_provider_token");
      store.delete("oauth_provider_refresh_token");
    }
  });

  return await supabase.auth.signOut({ scope });
}
