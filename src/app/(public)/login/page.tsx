import { LogIn as SignInForm } from "@/components/SignIn";
import { SpotifySignIn } from "@/components/SignOut";

export default function LogIn() {
  return (
    <main className="layout-grid">
      <SignInForm />
      <SpotifySignIn />
    </main>
  );
}
