"use client";

import Form from "next/form";
import { useActionState } from "react";
import { handleSearch } from "@/lib/actions/search";
import Link from "next/link";

export default function Search() {
	const [state, action, isPending] = useActionState(handleSearch, {});

	return (
		<section>
			<Form action={action} className="flex gap-2 *:rounded-sm py-4">
				<input
					name="query"
					defaultValue={state?.q}
					className="bg-slate-50 border-slate-300 hover:border-slate-400 border p-2 focus:outline-slate-500 focus:border-0"
				/>
				<button
					className={`${isPending && "opacity-25"} p-2 bg-amber-600 text-white font-bold cursor-pointer hover:bg-amber-500`}
					type="submit"
					disabled={isPending}
				>
					Search
				</button>
			</Form>
			{state?.artists && <SearchResults data={state?.artists?.items} />}
		</section>
	);
}

function SearchResults({
	data,
}: {
	data: Record<string, string | number | undefined>[];
}) {
	return (
		<ul>
			{data?.map(({ name, id }, index: number) => {
				return (
					<li key={index}>
						<h3>
							<Link href={`/artist/${id}`}>{name}</Link>
						</h3>
					</li>
				);
			})}
		</ul>
	);
}
