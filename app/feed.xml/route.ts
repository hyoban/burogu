import { getPostList } from "@/lib/notion";
import config, { timeZone } from "@/site.config.cjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Feed } from "feed";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(timeZone);

export async function GET(request: Request) {
  const feed = new Feed({
    title: config.siteName,
    description: config.description,
    id: config.siteUrl,
    link: config.siteUrl,
    image: config.siteUrl + config.avatarPath,
    favicon: config.siteUrl + config.faviconPath,
    copyright: "All rights reserved, " + config.siteName,
    feedLinks: {
      atom: config.siteUrl + "/feed",
    },
    author: {
      name: config.authorName,
      email: config.authorEmail,
      link: config.authorLink,
    },
  });

  const posts = await getPostList();

  posts?.forEach((post) => {
    feed.addItem({
      title: post.title,
      link: config.siteUrl + "/" + post.slug,
      date: dayjs(post.publishedTime).tz(timeZone).toDate(),
      description: post.description,
      category: post.tags.map((tag) => ({
        name: tag,
      })),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
    },
    status: 200,
  });
}
