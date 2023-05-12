import CommandMenuInServer from "@/app/components/part/CommandMenuInServer"
import SITE_CONFIG from "@/site.config"

export default function Header({}) {
	return (
		<header className="flex w-full max-w-[64ch] mx-auto justify-between items-center print:hidden">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				{SITE_CONFIG.authorName}
			</h1>
			<CommandMenuInServer />
		</header>
	)
}
