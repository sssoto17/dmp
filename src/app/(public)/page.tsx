import Search from "@/components/Search";
import { verifySession } from "@/lib/auth/dal";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense>
        <Welcome />
      </Suspense>
      <Search />
    </main>
  );
}

async function Welcome() {
  const { isAuth, user } = await verifySession();

  if (!isAuth)
    return (
      <section>
        <h1>Dream Music Player</h1>
      </section>
    );

  return (
    <section>
      <h1>Hello {user?.name}!</h1>
    </section>
  );
}
