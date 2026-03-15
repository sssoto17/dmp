declare namespace NodeJS {
	interface ProcessEnv {
		NEXT_PUBLIC_SUPABASE_URL: string;
		NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string;
		SPOTIFY_API_TOKEN: string;
		SPOTIFY_API_URL: string;
		SPOTIFY_REDIRECT_URI: string;
		SPOTIFY_CLIENT_ID: string;
		SPOTIFY_CLIENT_SECRET: string;
	}
}
