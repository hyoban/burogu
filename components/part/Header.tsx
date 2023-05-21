import SITE_CONFIG from "@/config/site.config"
import Link from "next/link"

export default function Header() {
	return (
		<header className="flex w-full items-center justify-between">
			<Link href="/">
				<h1 className="scroll-m-20 font-syne text-4xl tracking-wider lg:text-5xl">
					{SITE_CONFIG.authorName}
				</h1>
			</Link>
		</header>
	)
}
