import { getAuthUser } from "@/lib/auth/user";
import Link from "next/link";
import SignOut from "../SignOut";
import { Suspense } from "react";

export default async function Header() {
  return (
    <header className="layout-grid sticky top-0 mb-8 w-full bg-white py-4 drop-shadow-lg">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-amber-700">
          DMP
        </Link>
        <Suspense>
          <UserBadge />
        </Suspense>
      </nav>
    </header>
  );
}

async function UserBadge() {
  const { data } = await getAuthUser();

  if (!data?.claims)
    return (
      <Link
        className="cursor-pointer rounded-md bg-amber-500 px-4 py-1 font-bold text-white hover:bg-amber-400"
        href="/login"
      >
        Sign in
      </Link>
    );
  return (
    <div className="flex gap-4">
      <Avatar url="/dashboard" />
      <SignOut />
    </div>
  );
}

function Avatar({ url }: { url: string }) {
  return (
    <Link href={url}>
      <div className="aspect-square w-10 rounded-full bg-linear-to-b from-amber-200 to-fuchsia-400 drop-shadow-lg" />
    </Link>
  );
}
