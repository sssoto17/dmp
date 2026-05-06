import Image from "next/image";
import Spotify from "@/lib/Spotify";
import { Suspense } from "react";
import { AlbumGrid } from "@/components/music/Album";

interface Props {
  params: Promise<{ artistId: string }>;
}

export default async function ArtistPage({ params }: Props) {
  return (
    <main>
      <article>
        <Suspense fallback={<p>Loading...</p>}>
          <Heading params={params} />
          <AlbumGrid params={params} />
        </Suspense>
      </article>
    </main>
  );
}

async function Heading({ params }: { params: Promise<{ artistId: string }> }) {
  const { artistId } = await params;
  const spotify = await Spotify.create();

  const data = await spotify.artist(artistId);

  if (!data)
    return (
      <article>
        <h2>No artist.</h2>
      </article>
    );

  const { name, images } = data;

  return (
    <header className="grid gap-8 py-8 md:grid-cols-2">
      {images && (
        <Image
          src={images[0].url}
          alt={name || ""}
          width={images[0].width}
          height={images[0].height}
          priority
          loading="eager"
          className="rounded-md mask-b-from-70%"
        />
      )}
      <h2 className="text-4xl font-bold">{name}</h2>
      {/* <TrackList data={data} /> */}
    </header>
  );
}
