import { getPostList } from "@/lib/notion"
import { NAV_LIST } from "@/lib/static"
import config from "@/site.config.cjs"

export default async function sitemap() {
	const allBlogs = await getPostList()
	const blogs = allBlogs?.map((post) => ({
		url: `${config.siteUrl}/post/${post.slug}`,
		lastModified: post.publishedTime.split("T")[0],
	}))

	const routes = NAV_LIST.map((route) => ({
		url: `${config.siteUrl}${route.href}`,
		lastModified: new Date().toISOString().split("T")[0],
	}))

	return [...routes, ...(blogs ?? [])]
}
