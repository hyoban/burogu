import { timeZone } from "@/site.config.cjs";
import clsx, { ClassValue } from "clsx";
import dayjs from "dayjs";
import Parser from "rss-parser";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isExternalLink(url?: string): boolean {
	if (!url) return false;
	return url.startsWith("http") || url.startsWith("//");
}

export function joinFeedItemUrl(feedUrl: string, itemUrl?: string): string {
	if (!itemUrl) return feedUrl;
	if (isExternalLink(itemUrl)) return itemUrl;
	if (feedUrl.endsWith("/")) feedUrl = feedUrl.slice(0, -1);
	if (itemUrl.startsWith("/")) itemUrl = itemUrl.slice(1);
	return feedUrl + "/" + itemUrl;
}

export function isFeedItemValid(item: Parser.Item): boolean {
	if (!item.link) return false;
	if (!item.title) return false;
	if (!item.isoDate) return false;
	if (item.title === "No title") return false;
	// limit to 2 year
	if (
		dayjs(item.isoDate)
			.tz(timeZone)
			.isBefore(dayjs().tz(timeZone).subtract(2, "year"))
	)
		return false;
	return true;
}
