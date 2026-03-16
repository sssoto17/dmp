import { NextRequest, NextResponse } from "next/server";
import createClient from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  let response: NextResponse;

  const origin = process.env.SITE_URL;
  const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
  let next = searchParams.get("next") ?? "/";

  if (!next.startsWith("/")) {
    next = "/";
  }

  if (process.env.NODE_ENV === "development") {
    response = NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    response = NextResponse.redirect(`${origin}${next}`);
  }

  if (code) {
    const supabase = await createClient();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session && session.provider_token) {
        response.cookies.set("oauth_provider_token", session.provider_token, {
          maxAge: session.expires_in,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
        });
      }
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error(error);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    return response;
  } else return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
