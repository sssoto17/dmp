"use client";

import { handleSignOut, handleSpotifySignIn } from "@/lib/auth/actions";

export default function SignOut() {
  return (
    <button
      onClick={handleSignOut}
      className="cursor-pointer rounded-md bg-amber-500 px-4 py-1 font-bold text-white hover:bg-amber-400"
    >
      Sign out
    </button>
  );
}

export function SpotifySignIn() {
  return (
    <button
      onClick={handleSpotifySignIn}
      className="col-span-2 cursor-pointer rounded-md bg-emerald-600 px-6 py-2 font-bold text-white hover:bg-emerald-500"
    >
      Sign in with Spotify
    </button>
  );
}
