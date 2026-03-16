import Search from "@/components/Search";
import { verifySession } from "@/lib/auth/dal";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="layout-grid">
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
      <h1>Hello {user?.user_metadata?.full_name}!</h1>
    </section>
  );
}
