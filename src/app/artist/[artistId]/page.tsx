import { getArtist } from "@/lib/spotify/data";
import { cookies } from "next/headers";
import Image from "next/image";
import type { Params, ParamValue } from "next/dist/server/request/params";
import { Suspense } from "react";
import Link from "next/link";

export default async function Artist({ params }: { params: Params }) {
	const { artistId } = await params;

	return (
		<main className="layout-grid">
			<article>
				<Suspense fallback={<p>Loading...</p>}>
					<Heading params={artistId} />
				</Suspense>
			</article>
		</main>
	);
}

async function Heading({ params }: { params: ParamValue }) {
	const token = (await cookies()).get("access_token")?.value;
	const data = await getArtist(params, token);

	if (!data || data?.error)
		return (
			<article>
				<h2>No artist.</h2>
			</article>
		);

	const { name, images, id, discography } = data;

	return (
		<header>
			<h2>{name}</h2>
			<Image
				src={images[0].url}
				alt={name}
				width={images[0].width}
				height={images[0].height}
				priority
			/>
			<ul>
				{discography.items.map(
					(
						{
							name,
							images,
							id: albumId,
						}: {
							name: string;
							images: {
								url: string;
								width: number;
								height: number;
							}[];
							id: string;
						},
						index: number,
					) => {
						return (
							<li key={index}>
								<Image
									src={images[1].url}
									alt={name}
									width={images[1].width}
									height={images[1].height}
								/>
								<h3>
									<Link
										href={`/artist/${id}/album/${albumId}`}
									>
										{name}
									</Link>
								</h3>
							</li>
						);
					},
				)}
			</ul>
		</header>
	);
}
