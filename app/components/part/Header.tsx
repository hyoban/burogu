import CommandMenuInServer from "@/app/components/part/CommandMenuInServer"
import SITE_CONFIG from "@/site.config"
import Link from "next/link"

export default function Header({}) {
	return (
		<header className="flex w-full justify-between items-center">
			<Link href="/">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
					{SITE_CONFIG.authorName}
				</h1>
			</Link>
			<CommandMenuInServer />
		</header>
	)
}
