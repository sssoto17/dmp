import "server-only";

import type { User } from "@supabase/supabase-js";

function canViewUsername(viewer: User) {
  return true;
}

function canViewEmail(viewer: User) {
  return viewer.role === "admin";
}

export async function getUserProfile() {}
