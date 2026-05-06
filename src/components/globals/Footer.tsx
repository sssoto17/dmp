import { Suspense } from "react";
import WebPlayer from "../music/WebPlayer";
import { verifySession } from "@/lib/auth/dal";
import { cookies } from "next/headers";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-10 w-full bg-slate-50 py-4">
      <Suspense>
        <WebPlayback />
      </Suspense>
    </footer>
  );
}

async function WebPlayback() {
  const token = (await cookies()).get("oauth_provider_token")?.value;

  return <WebPlayer token={token || ""} />;
}
