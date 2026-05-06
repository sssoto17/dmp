import Link from "next/link";
import SignOut from "../SignOut";

import { Suspense } from "react";
import { verifySession } from "@/lib/auth/dal";
import Search from "../Search";

export default async function Header() {
  return (
    <header className="sticky top-0 z-10 mb-8 w-full bg-white py-4 drop-shadow-lg">
      <nav className="flex items-center justify-between gap-6">
        <p className="flex-1"></p>
        <Search />
        <Suspense>
          <UserBadge />
        </Suspense>
      </nav>
    </header>
  );
}

async function UserBadge() {
  const { isAuth } = await verifySession();

  if (!isAuth)
    return (
      <Link
        className="cursor-pointer rounded-md bg-amber-500 px-4 py-1 font-bold text-white hover:bg-amber-400"
        href="/login"
      >
        Sign in
      </Link>
    );

  return (
    <div className="flex items-center gap-4">
      <Avatar url="/dashboard" />
      <SignOut />
    </div>
  );
}

function Avatar({ url }: { url: string }) {
  return (
    <Link href={url}>
      <div className="aspect-square w-8 rounded-full bg-linear-to-b from-amber-200 to-fuchsia-400 drop-shadow-lg" />
    </Link>
  );
}
