import Image from "next/image";
import Link from "next/link";

import Spotify from "@/lib/Spotify";
import { SimplifiedSpotifyAlbum } from "@/lib/Spotify/schema";

interface Props {
  params: Promise<{ artistId: string }>;
}

export async function AlbumGrid({ params }: Readonly<Props>) {
  const { artistId } = await params;

  const spotify = await Spotify.create();
  const { items: albums } = await spotify
    .artist(artistId)
    .then((data) => data?.discography);

  if (!albums) return;

  return (
    <ul className="flex flex-wrap gap-4">
      {albums.map((data: SimplifiedSpotifyAlbum) => {
        return <AlbumCard key={data.id} {...data} />;
      })}
    </ul>
  );
}

export function AlbumCard({
  name,
  images,
  id,
  artists,
}: SimplifiedSpotifyAlbum) {
  return (
    <li className="relative">
      <article>
        {images[1] && (
          <Image
            src={images[1].url}
            alt={name}
            width={images[1].width || 300}
            height={images[1].height || 300}
            className="aspect-square rounded-xl"
          />
        )}
        <h3 className="py-2 text-center text-xl font-semibold">
          <Link
            className="after:absolute after:inset-0"
            href={`/artist/${artists[0]?.id}/album/${id}`}
          >
            {name}
          </Link>
        </h3>
      </article>
    </li>
  );
}
