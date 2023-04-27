import { getPostList } from "@/lib/notion"
import SITE_CONFIG from "@/site.config"

export default async function sitemap() {
	const allBlogs = await getPostList()
	const blogs = allBlogs?.map((post) => ({
		url: `${SITE_CONFIG.siteUrl}/post/${post.slug}`,
		lastModified: post.publishedTime.split("T")[0],
	}))

	return [...(blogs ?? [])]
}
