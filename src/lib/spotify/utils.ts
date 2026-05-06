import { Buffer } from "node:buffer";

export function encode(id: string, secret: string): string {
  const str = `${id}:${secret}`;
  return Buffer.from(str).toString("base64");
}

export const secureCookieProps = (
  name: string,
  value: string,
  maxAge: number,
) => ({
  name,
  value,
  maxAge,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
});

export function mountScript() {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;

  document.body.appendChild(script);
}
