import "server-only";

import { Session } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { ParamValue } from "next/dist/server/request/params";
import {
  ReadonlyRequestCookies,
  ResponseCookies,
} from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { verifySession } from "../auth/dal";
import { secureCookieProps } from "./utils";
import {
  Method,
  SearchFilter,
  SpotifyHeaders,
  SpotifyAuthPayload,
} from "./schema";

export default class Spotify {
  #base = {
    api: process.env.SPOTIFY_API_URL,
    auth: process.env.SPOTIFY_API_TOKEN,
  };
  #endpoint: string = "";
  #id: string | ParamValue = "";

  #method: Method = "GET";
  #headers: SpotifyHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  #payload: SpotifyAuthPayload | undefined;
  #signal: AbortSignal | undefined;

  #client_id = process.env.SPOTIFY_CLIENT_ID;
  #client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  #encode = (str: string) => Buffer.from(str).toString("base64");

  get #client_credentials() {
    const str = `${this.#client_id}:${this.#client_secret}`;
    return `Basic ${this.#encode(str)}`;
  }

  get #options(): RequestInit {
    const options: RequestInit = {
      method: this.#method,
      headers: this.#headers as HeadersInit,
    };

    if (this.#payload) {
      options.body = new URLSearchParams(
        this.#payload as Record<string, string>,
      );
    }

    if (this.#signal) {
      options.signal = this.#signal;
    }

    return options;
  }

  get url() {
    return this.#base[this.mode] + this.#endpoint + this.#id;
  }

  async #setToken() {
    const access_token = (await cookies()).get("oauth_provider_token")?.value;
    this.#headers.Authorization = `Bearer ${access_token}`;
  }

  private constructor(
    private readonly mode: "api" | "auth",
    private readonly userId?: string,
  ) {}

  static async authorize(
    store?: ReadonlyRequestCookies | ResponseCookies,
    session?: Session | null,
  ) {
    const auth = new Spotify("auth");

    await auth.#setToken();

    auth.#headers.Authorization = auth.#client_credentials;
    auth.#method = "POST";

    const cookieStore = store || (await cookies());

    if (!session || !session?.provider_refresh_token) {
      auth.#payload = { grant_type: "client_credentials" };
    } else {
      auth.#payload = {
        grant_type: "refresh_token",
        refresh_token: session.provider_refresh_token,
      };
    }

    const { access_token, expires_in, error } = await auth.#get();

    if (!error) {
      cookieStore.set(
        secureCookieProps("oauth_provider_token", access_token, expires_in),
      );
      return { success: true, access_token, expires_in };
    }

    return { success: false, ...error };
  }

  async #get() {
    const res = await fetch(this.url, this.#options);

    if (!res.ok || !res.body)
      return {
        error: "invalid_request",
        error_description: "No JSON body to parse.",
      };

    return await res.json();
  }

  static async create() {
    const { isAuth, user } = await verifySession();

    let api;

    if (!isAuth) {
      api = new Spotify("api");
    } else {
      api = new Spotify("api", user?.id);
    }

    await api.#setToken();

    return api;
  }

  async artist(id: string | ParamValue) {
    this.#endpoint = "/artists/";

    this.#id = id;
    const artist = await this.#get();

    this.#id = this.#id + "/albums";
    const discography = await this.#get();

    return { ...artist, discography };
  }

  async album(id: string | ParamValue) {
    this.#endpoint = "/albums/";

    this.#id = id;
    const album = await this.#get();

    this.#id = this.#id + "/tracks";
    const tracks = await this.#get();

    return { ...album, tracks };
  }

  async search(q: string, filter: SearchFilter = ["artist", "album", "track"]) {
    const query = new URLSearchParams({ q, type: filter.join(",") });
    this.#endpoint = "/search?";
    this.#id = query.toString();

    return await this.#get();
  }

  get library() {
    this.#endpoint = "/me/top/";

    return {
      top: async () => {
        this.#id = "artists";
        const { items: artists, error } = await this.#get();

        this.#id = "tracks";
        const { items: tracks } = await this.#get();

        if (error) return;

        return { artists, tracks };
      },
      update: "/me/library",
      playlists: "/me/playlists",
      artists: "/me/following",
      albums: "/me/albums",
      tracks: "/me/tracks",
    };
  }

  get player() {
    this.#endpoint = "/me/player";

    return {
      playback_state: async () => {
        return await this.#get();
      },
      devices: async () => {
        this.#id = "/devices";
        return await this.#get().then((data) => data.devices);
      },
      current: async () => {
        this.#id = "/queue";
        return await this.#get().then((data) => data.currently_playing);
      },
      recent: async () => {
        this.#id = "/recently-played";
        return await this.#get().then((data) => {
          if (data?.error) return;
          return data;
        });
      },
      queue: async () => {
        this.#id = "/queue";
        return await this.#get().then((data) => data.queue);
      },
      play: async () => {
        this.#id = "/play";
        this.#method = "PUT";
        this.#headers["Content-Type"] = "application/json";

        // NOT DONE

        return await this.#get();
      },
      pause: "/me/player/pause",
      next: "/me/player/next",
      previous: "/me/player/previous",
      seek: "/me/player/seek",
      repeat: "/me/player/repeat",
      shuffle: "/me/player/shuffle",
      volume: "/me/player/volume",
    };
  }
}
