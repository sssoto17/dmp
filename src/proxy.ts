import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/proxy";
import { get_client_token } from "./lib/spotify/auth";

export async function proxy(request: NextRequest) {
	return await updateSession(request);
	// const response = NextResponse.next();

	// TODO: auth access

	// TODO: unauth access
	// const data = await get_client_token();

	// if (data?.error) {
	// 	console.error("Failed to acquire public token.");
	// }

	// response.cookies.set("access_token", data.access_token, {
	// 	maxAge: data.expires_in,
	// 	httpOnly: true,
	// 	secure: process.env.NODE_ENV === "production",
	// 	path: "/",
	// });

	// return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
