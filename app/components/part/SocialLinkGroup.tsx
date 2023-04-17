import IconLink from "@/app/components/ui/IconLink"
import SITE_CONFIG from "@/site.config"

export default function SocialLinkGroup() {
	return (
		<div className="flex flex-row print:flex-col gap-2">
			{SITE_CONFIG.links.map((link) => (
				<IconLink
					className="w-5 h-5 text-white"
					key={link.url}
					type={link.type}
					href={link.url}
				></IconLink>
			))}
		</div>
	)
}
