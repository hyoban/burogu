import { getPostContentNotion } from "@/lib/notion"

export type Metadata = {
	title: string
	permalink: string
	description: string
	cover: string
	publish: boolean
	date: string
	updated: string
	tags: string[]
}

export type Post<ContentType> = {
	metadata: Metadata
	content: ContentType
}

export type LocalPost = Post<string>

export type NotionContentType = NonNullable<
	Awaited<ReturnType<typeof getPostContentNotion>>
>
export type NotionPost = Post<NotionContentType>

export type ValidPost = LocalPost | NotionPost
