import Link from "next/link";

export default function Header() {
	return (
		<header className="layout-grid sticky top-0 w-full py-4 bg-white drop-shadow-lg mb-8">
			<Link href="/" className="text-xl font-bold text-amber-700">
				DMP
			</Link>
		</header>
	);
}
