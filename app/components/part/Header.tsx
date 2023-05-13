import SITE_CONFIG from "@/site.config"
import Link from "next/link"

export default function Header({}) {
	return (
		<header className="flex w-full justify-between items-center">
			<Link href="/">
				<h1 className="scroll-m-20 text-4xl lg:text-5xl tracking-wider font-syne">
					{SITE_CONFIG.authorName}
				</h1>
			</Link>
		</header>
	)
}
