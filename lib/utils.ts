import Parser from 'rss-parser'

export function isExternalLink(url?: string): boolean {
  if (!url) return false
  return url.startsWith('http') || url.startsWith('//')
}

export function joinFeedItemUrl(feedUrl: string, itemUrl?: string): string {
  if (!itemUrl) return feedUrl
  if (isExternalLink(itemUrl)) return itemUrl
  if (feedUrl.endsWith('/')) feedUrl = feedUrl.slice(0, -1)
  if (itemUrl.startsWith('/')) itemUrl = itemUrl.slice(1)
  return feedUrl + '/' + itemUrl
}

export function isFeedItemValid(item: Parser.Item): boolean {
  if (!item.link) return false
  if (!item.title) return false
  if (!item.isoDate) return false
  if (item.title === 'No title') return false
  return true
}
