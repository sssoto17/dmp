import Image from "next/image";
import { Suspense } from "react";
import { TrackList } from "@/components/music/Tracks";

import Spotify from "@/lib/Spotify";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{ albumId: string }>;
}

export default async function AlbumPage({ params }: Props) {
  return (
    <main className="layout-grid">
      <Suspense fallback={<p>Loading...</p>}>
        <Album params={params} />
      </Suspense>
    </main>
  );
}

async function Album({ params }: { params: Promise<{ albumId: string }> }) {
  const { albumId } = await params;

  const spotify = await Spotify.create();
  const data = await spotify.album(albumId);

  if (!data || data?.error)
    return (
      <article>
        <h2>No album.</h2>
      </article>
    );

  const {
    name,
    images,
    tracks: { items },
    uri,
  } = data;

  const token = (await cookies()).get("oauth_provider_token")?.value;

  return (
    <section>
      <header>
        <h2>{name}</h2>
        <Image
          src={images[0].url}
          alt={name}
          width={images[0].width}
          height={images[0].height}
          priority
          loading="eager"
        />
      </header>
      <TrackList tracks={items} token={token as string} context_uri={uri} />
    </section>
  );
}
