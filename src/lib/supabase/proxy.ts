import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import Spotify from "../Spotify";

const authRoutes = ["/dashboard", "/library"];
const publicRoutes = ["/", "/login", "/signup"];

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

  const user = await supabase.auth.getClaims().then(({ data }) => data?.claims);
  const { session } = await supabase.auth.getSession().then((res) => res.data);

  if (!request.cookies.has("oauth_provider_token")) {
    await Spotify.authorize(supabaseResponse.cookies, session);
  }

  // REDIRECT
  const isAuth = authRoutes.includes(request.nextUrl.pathname);
  const isPublic = publicRoutes.includes(request.nextUrl.pathname);

  if (user && isPublic)
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));

  if (!user && isAuth)
    return NextResponse.redirect(new URL("/login", request.nextUrl));

  return supabaseResponse;
}
