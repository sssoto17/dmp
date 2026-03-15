"use client";

import { handleAuth, type State } from "@/lib/actions/auth";
import Form from "next/form";
import { useActionState } from "react";
import TextInput from "./forms/Input";
import { redirect } from "next/navigation";

const initState: State = {};

export function LogIn() {
	const [state, action, isPending] = useActionState(handleAuth, initState);

	if (state?.success) redirect("/");

	return (
		<Form action={action} className="grid grid-cols-[auto_1fr] gap-4">
			<TextInput
				name="userEmail"
				type="email"
				inputMode="email"
				isDisabled={isPending}
				defaultValue={state?.user?.email}
				error={state?.error}
			>
				Email
			</TextInput>
			<TextInput
				name="userPassword"
				type="password"
				isDisabled={isPending}
				defaultValue={state?.user?.password}
				error={state?.error}
			>
				Password
			</TextInput>
			{/* TODO: button component */}
			<button className="col-span-2 bg-emerald-600 hover:bg-emerald-500 cursor-pointer text-white font-bold px-6 py-2">
				Sign in with Spotify
			</button>
			{state?.error && <p className="col-span-2">{state?.error}</p>}
		</Form>
	);
}
