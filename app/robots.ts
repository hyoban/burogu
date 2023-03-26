import config from "@/site.config.cjs"

export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
			},
		],
		sitemap: `${config.siteUrl}/sitemap.xml`,
		host: config.siteUrl,
	}
}
