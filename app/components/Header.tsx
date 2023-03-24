import Avatar from "@/app/components/Avatar"
import IconLink from "@/app/components/IconLink"
import Nav from "@/app/components/Nav"
import NavTrigger from "@/app/components/NavTrigger"
import config from "@/site.config.cjs"

export default function Header({}) {
	return (
		<header className="flex flex-col sm:flex-row gap-6 w-full items-center sm:justify-between">
			<Nav className="hidden sm:flex sm:order-last" />
			<NavTrigger className="sm:hidden" />
			<div className="flex items-center gap-4">
				<Avatar className="w-24 h-24 sm:w-16 sm:h-16" />
				<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
					<div className="flex flex-col gap-2 items-center">
						<p className="font-mono text-2xl text-slate-700 dark:text-slate-400">
							{config.authorName}
						</p>
						<p className="text-slate-500 dark:text-slate-400">
							{config.shortDescription}
						</p>
					</div>
					<div className="flex gap-2 mt-2">
						{config.links.map((link) => (
							<IconLink
								key={link.url}
								type={link.type as "GitHub" | "Twitter" | "Email"}
								href={link.url}
							></IconLink>
						))}
					</div>
				</div>
			</div>
		</header>
	)
}
