import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import createClient from "../supabase/server";

export async function createUser(user: SignUpWithPasswordCredentials) {
	const supabase = await createClient();
	return supabase.auth.signUp(user);
}
