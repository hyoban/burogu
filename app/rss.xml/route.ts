import "@/lib/dayjs"

import SITE_CONFIG from "@/config/site.config"
import { getMetadataList } from "@/lib/post"
import dayjs from "dayjs"
import { Feed } from "feed"

export async function GET() {
	const feed = new Feed({
		title: SITE_CONFIG.siteName,
		description: SITE_CONFIG.description,
		id: SITE_CONFIG.siteUrl,
		link: SITE_CONFIG.siteUrl,
		image: SITE_CONFIG.siteUrl + SITE_CONFIG.avatarPath,
		favicon: SITE_CONFIG.siteUrl + SITE_CONFIG.faviconPath,
		copyright: "All rights reserved, " + SITE_CONFIG.siteName,
		author: {
			name: SITE_CONFIG.authorName,
			email: SITE_CONFIG.authorEmail,
			link: SITE_CONFIG.authorLink,
		},
	})

	const posts = await getMetadataList()

	posts?.forEach((post) => {
		feed.addItem({
			title: post.title,
			link: SITE_CONFIG.siteUrl + "/post/" + post.permalink,
			description: post.description,
			date: dayjs(post.updated).tz(SITE_CONFIG.timeZone).toDate(),
		})
	})

	return new Response(feed.rss2(), {
		headers: {
			"Content-Type": "text/xml",
		},
	})
}
