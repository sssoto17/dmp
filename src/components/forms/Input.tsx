import React from "react";
import { Input, Label, TextField, TextFieldProps } from "react-aria-components";

interface Props extends TextFieldProps {
	error?: string;
	isDisabled: boolean;
	children: React.ReactNode;
}

// TODO: Tailwind variants

export default function TextInput({
	children,
	isDisabled,
	error,
	...props
}: Props) {
	const styles = {
		default: "p-1 border border-slate-600 rounded-sm",
		error: "p-1 border border-rose-600 rounded-sm",
	};
	return (
		<TextField
			{...props}
			className="col-span-2 grid grid-cols-subgrid"
			isDisabled={isDisabled}
		>
			<Label>{children}</Label>
			<Input className={error ? styles["error"] : styles["default"]} />
		</TextField>
	);
}
