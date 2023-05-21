import { getPostContentNotion } from "@/lib/notion"
import { MDXRemoteSerializeResult } from "next-mdx-remote"

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

export type LocalPost = Post<MDXRemoteSerializeResult>

export type NotionContentType = NonNullable<
	Awaited<ReturnType<typeof getPostContentNotion>>
>
export type NotionPost = Post<NotionContentType>

export type ValidPost = LocalPost | NotionPost
