import "server-only";

import { cache } from "react";
import createClient from "../supabase/server";
import { User, JwtPayload } from "@supabase/supabase-js";

export const verifySession = cache(
  async (): Promise<{
    isAuth: boolean;
    user?: User | JwtPayload;
  }> => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();

    if (!data?.claims || error) return { isAuth: false };

    return { isAuth: true, user: data?.claims };
  },
);
