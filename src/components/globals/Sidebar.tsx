import Link from "next/link";
import { FaMusic, FaHouse } from "react-icons/fa6";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 bottom-0 z-10 grid h-screen justify-items-center bg-white p-4 text-slate-700 drop-shadow-xl md:justify-items-start">
      <Logo />
      <Menu />
    </aside>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-bold"
      aria-describedby="label"
    >
      <LogoIcon />
      <p
        id="label"
        className="hidden max-w-32 leading-4 text-amber-600 md:block"
      >
        Dream Music Player
      </p>
    </Link>
  );
}

function LogoIcon() {
  return (
    <div className="rounded-full bg-linear-to-b from-amber-200 to-fuchsia-400 p-3 text-xl text-white">
      <FaMusic />
    </div>
  );
}

function Menu() {
  return (
    <nav className="py-4">
      <ul>
        <li>
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            aria-describedby="label"
          >
            <FaHouse size={20} />
            <span id="label" className="hidden md:inline">
              Dashboard
            </span>
          </Link>
        </li>
        {/* <li>Library</li>
        <li>Settings</li> */}
      </ul>
    </nav>
  );
}
