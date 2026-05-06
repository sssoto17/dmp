"use client";

import { handleSignIn, type State } from "@/lib/auth/actions";
import Form from "next/form";
import { useActionState } from "react";
import TextInput from "./forms/Input";
import { redirect } from "next/navigation";

export function LogIn() {
  const [state, action, isPending] = useActionState(handleSignIn, {} as State);

  if (state?.success) redirect("/");

  return (
    <Form action={action} className="mb-4 grid grid-cols-[auto_1fr] gap-4">
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
      <button className="col-span-2 cursor-pointer rounded-md bg-amber-500 px-6 py-2 font-bold text-white hover:bg-amber-400">
        Log in
      </button>
      {state?.error && <p className="col-span-2">{state?.error}</p>}
    </Form>
  );
}
