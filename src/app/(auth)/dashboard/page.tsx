import { verifySession } from "@/lib/auth/dal";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense>
        <Welcome />
      </Suspense>
    </main>
  );
}

async function Welcome() {
  const { isAuth, user } = await verifySession();

  // const spotify = await Spotify.create();
  // const current = await spotify.player.playback_state();

  // console.log(current);

  if (!isAuth)
    return (
      <section>
        <h1>Dream Music Player</h1>
      </section>
    );

  return (
    <section>
      <h1>Hello {user?.name}!</h1>
      {/* <h2>{userTest?.country}</h2> */}
    </section>
  );
}
