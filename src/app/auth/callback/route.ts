import { get_auth_token } from "@/lib/spotify/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const response = NextResponse.redirect(new URL("/", request.url));

	if (request.nextUrl.searchParams.has("error")) {
		console.error(request.nextUrl.searchParams.get("error"));
		response.headers.set("error", "An error occurred.");

		return response;
	}

	// TODO: validate state
	const state = request.nextUrl.searchParams.get("state") === "test";
	if (!state) {
		console.error("Invalid state.");
		response.headers.set("error", "Invalid state.");

		return response;
	}

	// TODO: acquire tokens
	const code = request.nextUrl.searchParams.get("code") || "";
	const data = await get_auth_token(code);

	// TODO: error handling
	if (data?.error) {
		console.error(data?.error_description);
		return response;
	}

	// TODO: handle session
	const { access_token, refresh_token, expires_in } = data;

	response.cookies.set("access_token", access_token, {
		maxAge: expires_in,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	response.cookies.set("refresh_token", refresh_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});

	return response;
}
