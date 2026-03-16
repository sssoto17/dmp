import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  getAnonProviderToken,
  refreshAuthProviderToken,
} from "../spotify/token";

const authRoutes = ["/dashboard", "/library"];
const publicRoutes = ["/login", "/signup"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse: NextResponse = NextResponse.next({
    request,
  });

  // AUTH
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // REFRESH TOKEN
  const hasToken = request.cookies.has("oauth_provider_token");

  if (user && !hasToken) {
    const { access_token, expires_in, error } =
      await refreshAuthProviderToken(supabase);

    if (!error) {
      supabaseResponse.cookies.set("oauth_provider_token", access_token, {
        maxAge: expires_in,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }
  }

  if (!user && !hasToken) {
    const { access_token, expires_in, error } = await getAnonProviderToken();

    if (!error) {
      supabaseResponse.cookies.set("oauth_provider_token", access_token, {
        maxAge: expires_in,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    }
  }

  // REDIRECT
  const isAuth = authRoutes.includes(request.nextUrl.pathname);
  const isPublic = publicRoutes.includes(request.nextUrl.pathname);

  if (user && isPublic)
    return NextResponse.redirect(new URL("/", request.nextUrl));

  if (!user && isAuth)
    return NextResponse.redirect(new URL("/login", request.nextUrl));

  return supabaseResponse;
}
