import SITE_CONFIG from "@/config/site.config"
import { getMetadataList } from "@/lib/post"

export default async function sitemap() {
	const allBlogs = await getMetadataList()
	const blogs =
		allBlogs?.map((post) => ({
			url: `${SITE_CONFIG.siteUrl}/post/${post.permalink}`,
			lastModified: post.updated.split("T")[0],
		})) ?? []

	return [
		{
			url: SITE_CONFIG.siteUrl,
			lastModified: new Date().toISOString().split("T")[0],
		},
		...blogs,
	]
}
