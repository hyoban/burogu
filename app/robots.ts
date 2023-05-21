import SITE_CONFIG from "@/config/site.config"

export default function robots() {
	return {
		rules: [
			{
				userAgent: "*",
			},
		],
		sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
		host: SITE_CONFIG.siteUrl,
	}
}
