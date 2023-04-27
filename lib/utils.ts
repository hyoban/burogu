import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function isExternalLink(url?: string): boolean {
	if (!url) return false
	return url.startsWith("http") || url.startsWith("//")
}

export function joinFeedItemUrl(feedUrl: string, itemUrl?: string): string {
	if (!itemUrl) return feedUrl
	if (isExternalLink(itemUrl)) return itemUrl
	if (feedUrl.endsWith("/")) feedUrl = feedUrl.slice(0, -1)
	if (itemUrl.startsWith("/")) itemUrl = itemUrl.slice(1)
	return feedUrl + "/" + itemUrl
}
