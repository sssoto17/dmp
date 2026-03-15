import { getAlbum } from "@/lib/spotify/data";
import { Params, ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import Image from "next/image";
import { Suspense } from "react";

export default async function Album({ params }: { params: Params }) {
	const { albumId } = await params;

	return (
		<main className="layout-grid">
			<article>
				<Suspense fallback={<p>Loading...</p>}>
					<Heading params={albumId} />
				</Suspense>
			</article>
		</main>
	);
}

async function Heading({ params }: { params: ParamValue }) {
	const token = (await cookies()).get("access_token")?.value;
	const data = await getAlbum(params, token);

	if (!data || data?.error)
		return (
			<article>
				<h2>No album.</h2>
			</article>
		);

	const { name, images, tracks } = data;

	return (
		<>
			<header>
				<h2>{name}</h2>
				<Image
					src={images[0].url}
					alt={name}
					width={images[0].width}
					height={images[0].height}
					priority
				/>
			</header>
			<ol className="py-4">
				{tracks.items.map(
					(
						{
							name,
							track_number,
						}: { name: string; track_number: number },
						index: number,
					) => {
						return (
							<li key={index} className="flex gap-4 px-2">
								<p>{track_number}</p>
								<p>{name}</p>
							</li>
						);
					},
				)}
			</ol>
		</>
	);
}
