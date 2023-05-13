import AppearanceSwitch from "@/app/components/ui/AppearanceSwitch"
import IconLink from "@/app/components/ui/IconLink"
import SITE_CONFIG from "@/site.config"

const Footer = () => {
	return (
		<footer className="mx-auto w-fit flex gap-4">
			<AppearanceSwitch />
			<a
				href="/rss.xml"
				className="text-2xl flex"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div className="i-carbon-rss" />
			</a>
			{SITE_CONFIG.links.map((link, index) => (
				<IconLink {...link} key={index} />
			))}
		</footer>
	)
}

export default Footer
