import SITE_CONFIG from "@/site.config"
import { Metadata } from "next"

export const microLinkAPI = "https://i.microlink.io/"
export const cardUrl = "https://cards.microlink.io/?preset=contentz"

export const size = {
	width: 1200,
	height: 630,
}

export const getOGImage = (title: string, description: string) => {
	return `${microLinkAPI}${encodeURIComponent(
		cardUrl + `&title=${title}&description=${description}`
	)}`
}

const image = getOGImage(
	SITE_CONFIG.siteUrl.replace("https://", ""),
	SITE_CONFIG.description
)

export const sharedMetadata: Metadata = {
	twitter: {
		card: "summary_large_image",
		site: SITE_CONFIG.siteUrl,
		creator: SITE_CONFIG.authorName,
		title: SITE_CONFIG.siteName,
		description: SITE_CONFIG.description,
		images: [
			{
				url: image,
				width: size.width,
				height: size.height,
			},
		],
	},
	openGraph: {
		type: "website",
		url: SITE_CONFIG.siteUrl,
		title: SITE_CONFIG.siteName,
		description: SITE_CONFIG.description,
		siteName: SITE_CONFIG.siteName,
		images: [
			{
				url: image,
				width: size.width,
				height: size.height,
			},
		],
	},
}
