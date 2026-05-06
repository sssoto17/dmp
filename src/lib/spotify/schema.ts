export type GrantType = "client_credentials" | "refresh_token";

export interface SpotifyHeaders {
  "Content-Type"?: "application/x-www-form-urlencoded" | "application/json";
  Authorization?: string;
}

export interface SpotifyAuthPayload {
  grant_type?: GrantType;
  refresh_token?: string;
}

interface SpotifyToken {
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
  scope?: string;
  expires_in?: number;
}

interface SpotifyAuthError {
  error?: string;
  error_description?: string;
}

interface SpotifyApiError {
  error: {
    status: number;
    message: string;
  };
}

interface Image {
  url: string;
  width: number | null;
  height: number | null;
}

type SpotifyExternalUrls = { spotify: string };
type SpotifyExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};

type SpotifyRestrictions = {
  reason: "market" | "product" | "explicit";
};

type SpotifyCopyrights = {
  text: string;
  type: string;
};

type SpotifyRelinking = {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

// SPOTIFY DATA
interface SpotifyData<T = "artist" | "album" | "track"> {
  id: string;
  name: string;
  uri: string;
  href: string;
  external_urls: SpotifyExternalUrls;
  type: T;
}

interface SpotifyItemsData<T> {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}

// ARTISTS
export interface SpotifyArtist extends SpotifyData<"artist"> {
  images: Image[];
  popularity?: number;
  genres?: string[];
  followers?: { href: string | null; total: number };
}

// ALBUMS
// consolidate these properties into a type for any multi-result return from the Spotify API
export interface SimplifiedSpotifyAlbum extends SpotifyData<"album"> {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets?: string[];
  images: Image[];
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?: SpotifyRestrictions;
  artists: SpotifyData<"artist">[];
}

export interface SpotifyAlbum extends SimplifiedSpotifyAlbum {
  tracks: SpotifyItemsData<SimplifiedSpotifyTrack>;
  copyrights: SpotifyCopyrights[];
  external_ids: SpotifyExternalIds;
  genres?: [];
  label?: string;
}

// TRACKS

export interface SimplifiedSpotifyTrack extends SpotifyData<"track"> {
  artists: SpotifyData<"artist">[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  is_playable: boolean;
  linked_from?: SpotifyRelinking;
  restrictions: SpotifyRestrictions;
  preview_url?: string | null;
  track_number: number;
  is_local: boolean;
}

export interface SpotifyTrack extends SimplifiedSpotifyTrack {
  album: SimplifiedSpotifyAlbum;
  external_ids: SpotifyExternalIds;
  popularity?: number;
}

// also need to create function for matching slugs to Spotify artist IDs

export type SpotifyCredentials = SpotifyToken | SpotifyAuthError;
export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type SearchFilter = Array<"artist" | "album" | "track">;

// Testing example for returned artist DTO

type Images = {
  large: Image;
  medium: Image;
  thumbnail: Image;
};

interface SpotifyDTO {
  id: string;
  name: string;
  slug: string;
}

export interface SpotifyArtistDTO extends SpotifyDTO {
  genres: string[];
  followers: number;
  images: Images;
  discography: { name: string }[];
}
