import {
  SignInWithPasswordCredentials,
  SignOutScope,
} from "@supabase/supabase-js";
import { cookies } from "next/headers";
import createClient from "../supabase/server";
import Spotify from "../Spotify";

// TODO: Link regular user with Spotify account
// Possibly link several emails to same account + Spotify
export async function signIn(user: SignInWithPasswordCredentials) {
  const supabase = await createClient();

  return await supabase.auth.signInWithPassword(user);

  // MAKE SPOTIFY AUTH MANDATORY; ALL USERS MUST BE CONNECTED TO SPOTIFY
}

export async function authorizeSpotify() {
  const supabase = await createClient();

  // console.log(`${process.env.SITE_URL}/auth/callback`);

  return await supabase.auth.signInWithOAuth({
    provider: "spotify",
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/callback`,
      scopes:
        "user-read-email user-read-private user-top-read user-read-playback-position streaming user-read-currently-playing user-read-recently-played user-modify-playback-state user-read-playback-state",
    },
  });
}

export async function signOut(scope: SignOutScope) {
  const store = await cookies();
  const supabase = await createClient();

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_OUT") {
      store.delete("oauth_provider_token");

      await Spotify.authorize(store, session);
    }
  });

  return await supabase.auth.signOut({ scope });
}
