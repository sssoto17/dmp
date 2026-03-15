"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createUser } from "../auth/user";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

const {
	NODE_ENV,
	SPOTIFY_REDIRECT_URI: redirect_uri,
	SPOTIFY_CLIENT_ID: client_id,
} = process.env;

export type State = {
	user?: {
		email?: string;
		password?: string;
	};
	error?: string;
	success?: boolean;
};

export async function handleAuth(prev: State, formData: FormData) {
	const user = {
		email: formData.get("userEmail")?.toString(),
		password: formData.get("userPassword")?.toString(),
	};

	// TODO: frontend validation
	if (!user.email) return { user, error: "Invalid email." };
	if (!user.password) return { user, error: "Invalid password" };

	const { data, error } = await createUser(
		user as SignUpWithPasswordCredentials,
	);
	console.log(data);

	if (error) return { user, error: error.message };

	return { user, success: true };

	const cookieStore = await cookies();
	const state = "test";
	const scope = "user-read-private user-read-email";

	const query = new URLSearchParams({
		client_id,
		response_type: "code",
		redirect_uri,
		state,
		scope,
		show_dialog: (NODE_ENV === "development").toString(),
	});

	cookieStore.set("state", "test", {
		httpOnly: true,
		secure: false,
		path: "/",
		sameSite: "none",
	});

	redirect("https://accounts.spotify.com/authorize?" + query.toString());
}
