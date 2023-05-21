import SITE_CONFIG from "@/config/site.config"
import { getMetadataListLocal, getPostFromLocal } from "@/lib/local"
import {
	getMetadataListNotion,
	getPostContentNotion,
	getPostMetadataNotion,
} from "@/lib/notion"
import { Metadata, ValidPost } from "@/types/post"

export const getMetadataList = async () => {
	return SITE_CONFIG.source === "local"
		? await getMetadataListLocal()
		: await getMetadataListNotion()
}

export const getPost = async (permalink: string): Promise<ValidPost | null> => {
	if (SITE_CONFIG.source === "local") {
		return await getPostFromLocal(permalink)
	}
	const metadata = await getPostMetadataNotion(permalink)
	if (!metadata) return null
	const content = await getPostContentNotion(permalink)
	if (!content) return null
	return {
		metadata,
		content,
	}
}

export const getPostMetadata = async (
	permalink: string
): Promise<Metadata | null> => {
	if (SITE_CONFIG.source === "local") {
		const post = await getPostFromLocal(permalink)
		return post.metadata
	}
	return await getPostMetadataNotion(permalink)
}
