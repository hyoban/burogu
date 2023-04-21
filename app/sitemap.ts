import { NAV_LIST } from "@/app/data/static"
import { getPostList } from "@/lib/notion"
import SITE_CONFIG from "@/site.config"

export default async function sitemap() {
	const allBlogs = await getPostList()
	const blogs = allBlogs?.map((post) => ({
		url: `${SITE_CONFIG.siteUrl}/post/${post.slug}`,
		lastModified: post.publishedTime.split("T")[0],
	}))

	const routes = NAV_LIST.map((route) => ({
		url: `${SITE_CONFIG.siteUrl}${route.href}`,
		lastModified: new Date().toISOString().split("T")[0],
	}))

	return [...routes, ...(blogs ?? [])]
}
