import { cookies } from "next/headers";
import { Buffer } from "node:buffer";

export function encode(id: string, secret: string): string {
  const str = `${id}:${secret}`;
  return Buffer.from(str).toString("base64");
}

export async function get(endpoint: string) {
  const store = await cookies();
  const token = store.get("oauth_provider_token")?.value;

  return await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}
