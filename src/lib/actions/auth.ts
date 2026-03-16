"use server";

import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { authorizeSpotify, signIn, signOut } from "../auth/session";
import { createUser } from "../auth/user";
import { redirect } from "next/navigation";

export type State = {
  user?: {
    email?: string;
    password?: string;
  };
  error?: string;
  success?: boolean;
};

function getFormData(formData: FormData) {
  return {
    email: formData.get("userEmail")?.toString(),
    password: formData.get("userPassword")?.toString(),
  };
}

export async function handleSpotifySignIn() {
  const { data, error } = await authorizeSpotify();

  if (error) return console.error(error);

  redirect(data?.url);
}

export async function handleSignIn(
  prev: State,
  formData: FormData,
): Promise<State> {
  const user = getFormData(formData);

  // TODO: frontend validation
  if (!user?.email) return { user, error: "Please enter a valid email." };
  if (!user?.password) return { user, error: "Please enter your password." };

  const { error } = await signIn(user as SignInWithPasswordCredentials);

  if (error) return { ...prev, user, error: error.message };

  return { user, success: true };
}

export async function handleSignUp(prev: State, formData: FormData) {
  const user = getFormData(formData);

  // TODO: frontend validation
  if (!user.email) return { user, error: "Invalid email." };
  if (!user.password) return { user, error: "Invalid password" };

  const { error } = await createUser(user as SignUpWithPasswordCredentials);

  if (error) return { ...prev, user, error: error.message };

  return { user, success: true };
}

export async function handleSignOut() {
  const { error } = await signOut("local");

  if (error) {
    console.log("an error occurred: ", error);
  }
}
