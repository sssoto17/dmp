import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import createClient from "../supabase/server";
import createAdminClient from "../supabase/admin";

export async function createUser(user: SignUpWithPasswordCredentials) {
  const supabase = await createClient();

  return await supabase.auth.signUp(user);
}

// possibly create public users table to manage publicly readable user data
// instead of fetching as admin
export async function getUser(id: string) {
  const supabase = await createAdminClient();

  return await supabase.auth.admin.getUserById(id);
}

export async function getUsers() {
  const supabase = await createAdminClient();

  return await supabase.auth.admin.listUsers();
}
