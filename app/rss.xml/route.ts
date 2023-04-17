import { getPostList } from "@/lib/notion"
import SITE_CONFIG from "@/site.config"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { Feed } from "feed"

const { timeZone } = SITE_CONFIG

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(timeZone)

// https://beta.nextjs.org/docs/routing/route-handlers
// https://beta.nextjs.org/docs/routing/route-handlers#robotstxt-rssxml-and-sitemapxml
export async function GET() {
	const feed = new Feed({
		title: SITE_CONFIG.siteName,
		description: SITE_CONFIG.description,
		id: SITE_CONFIG.siteUrl,
		link: SITE_CONFIG.siteUrl,
		image: SITE_CONFIG.siteUrl + SITE_CONFIG.avatarPath,
		favicon: SITE_CONFIG.siteUrl + SITE_CONFIG.faviconPath,
		copyright: "All rights reserved, " + SITE_CONFIG.siteName,
		feedLinks: {
			atom: SITE_CONFIG.siteUrl + "/feed",
		},
		author: {
			name: SITE_CONFIG.authorName,
			email: SITE_CONFIG.authorEmail,
			link: SITE_CONFIG.authorLink,
		},
	})

	const posts = await getPostList()

	posts?.forEach((post) => {
		feed.addItem({
			title: post.title,
			link: SITE_CONFIG.siteUrl + "/post/" + post.slug,
			date: dayjs(post.publishedTime).tz(timeZone).toDate(),
			description: post.description,
			category: post.tags.map((tag) => ({
				name: tag,
			})),
		})
	})

	return new Response(feed.rss2(), {
		headers: {
			"Content-Type": "text/xml",
		},
	})
}
