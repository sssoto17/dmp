import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import createClient from "../supabase/server";
import createAdminClient from "../supabase/admin";

export async function createUser(user: SignUpWithPasswordCredentials) {
  const supabase = await createClient();
  return supabase.auth.signUp(user);
}

export async function getAuthUser() {
  const supabase = await createClient();

  return await supabase.auth.getClaims();
}

// export async function getAuthUser() {
//   const supabase = await createClient();

//   if (admin) {
//     return await supabase.auth.getUser();
//   } else return await supabase.auth.getClaims();
// }

export async function getUser(id: string) {
  const supabase = await createAdminClient();

  return await supabase.auth.admin.getUserById(id);
}

export async function getUsers() {
  const supabase = await createAdminClient();

  return await supabase.auth.admin.listUsers();
}
