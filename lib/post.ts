import SITE_CONFIG from "@/config/site.config"
import { getMetadataListLocal, getPostFromLocal } from "@/lib/local"
import {
	getMetadataListNotion,
	getPostContentNotion,
	getPostMetadataNotion,
} from "@/lib/notion"
import { Metadata, ValidPost } from "@/types/post"

export const getMetadataList = async () => {
	return SITE_CONFIG.source as string === "local"
		? await getMetadataListLocal()
		: await getMetadataListNotion()
}

export const getPost = async (slug: string): Promise<ValidPost | null> => {
	if (SITE_CONFIG.source as string === "local") {
		return await getPostFromLocal(slug)
	}
	const metadata = await getPostMetadataNotion(slug)
	if (!metadata) return null
	const content = await getPostContentNotion(slug)
	if (!content) return null
	return {
		metadata,
		content,
	}
}

export const getPostMetadata = async (
	slug: string
): Promise<Metadata | null> => {
	if (SITE_CONFIG.source as string === "local") {
		const post = await getPostFromLocal(slug)
		return post.metadata
	}
	return await getPostMetadataNotion(slug)
}
