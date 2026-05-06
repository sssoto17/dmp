import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/login", process.env.SITE_URL).href,
  );

  console.log("AUTH ERROR");
  return response;
}
