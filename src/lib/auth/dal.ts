import "server-only";

import { cache } from "react";
import createClient from "../supabase/server";

export const verifySession = cache(
  async (): Promise<{
    isAuth: boolean;
    user?: {
      id: string;
      name: string;
    };
  }> => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();

    if (!data?.claims || error) return { isAuth: false };

    return {
      isAuth: true,
      user: {
        id: data?.claims?.session_id,
        name: data?.claims?.user_metadata?.full_name,
      },
    }; // turn user into DTO so only minimum necessary data is returned
  },
);
