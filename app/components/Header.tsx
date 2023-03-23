import Avatar from "@/app/components/Avatar"
import IconLink from "@/app/components/IconLink"
import Nav from "@/app/components/Nav"
import config from "@/site.config.cjs"

export default function Header({}) {
	return (
		<header className="flex w-full items-center justify-between">
			<div className="flex items-center space-x-6">
				<Avatar />
				<div className="space-y-2">
					<p className="text-xl text-slate-700 dark:text-slate-400">
						{config.authorName}
					</p>
					<p className="text-sm text-slate-500 dark:text-slate-400">
						{config.shortDescription}
					</p>
					<div className="flex gap-2">
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
			<Nav />
		</header>
	)
}
