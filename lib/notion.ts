import "@/lib/dayjs"

import { Metadata } from "@/types/post"
import {
	BlockObjectResponse,
	ListBlockChildrenResponse,
	PageObjectResponse,
	QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints"

const notionToken = process.env.NOTION_TOKEN as string
const databaseId = process.env.NOTION_DATABASE_ID as string

const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
	"Notion-Version": "2022-06-28",
	Authorization: `Bearer ${notionToken}`,
}

async function generateNotionPostMetadata(
	page: PageObjectResponse
): Promise<Metadata> {
	return {
		permalink: page.id,
		date: page.created_time,
		updated: page.last_edited_time,
		title:
			page.properties.Name.type === "title"
				? page.properties.Name.title[0].plain_text
				: "",
		description: "",
		cover: "",
		publish: true,
		tags: [],
	}
}

export async function getMetadataListNotion(): Promise<Metadata[] | undefined> {
	try {
		const response = (await fetch(
			`https://api.notion.com/v1/databases/${databaseId}/query`,
			{
				method: "POST",
				headers,
			}
		).then((i) => i.json())) as QueryDatabaseResponse

		if (!response.results) return

		return Promise.all(
			(response.results as PageObjectResponse[]).map(generateNotionPostMetadata)
		)
	} catch (e) {
		console.error("getPostList", e)
	}
}

export async function getPostMetadataNotion(pageId: string) {
	try {
		const page = (await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
			method: "GET",
			headers,
		}).then((i) => i.json())) as PageObjectResponse

		return await generateNotionPostMetadata(page)
	} catch (e) {
		console.warn(`[getSinglePostInfo]: post ${pageId} not found`)
		return null
	}
}

export type Block = {
	cur: BlockObjectResponse
	children?: Block[]
}

export async function getPostContentNotion(
	blockId: string
): Promise<Block[] | null> {
	try {
		const blocks: Block[] = []
		let cursor
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const response = (await fetch(
				`https://api.notion.com/v1/blocks/${blockId}/children` +
					(cursor ? `?start_cursor=${cursor}` : ""),
				{
					method: "GET",
					headers,
				}
			).then((i) => i.json())) as ListBlockChildrenResponse
			const results = response.results as BlockObjectResponse[]

			const resultsWithChildren = await Promise.all(
				results.map(async (i) => {
					if (i.has_children) {
						return {
							cur: i,
							children: await getPostContentNotion(i.id),
						}
					}
					return {
						cur: i,
					}
				})
			)
			blocks.push(...(resultsWithChildren as Block[]))
			if (!response.next_cursor) {
				break
			}
			cursor = response.next_cursor
		}
		return blocks
	} catch (e) {
		console.log("getSinglePostContent", e)
		return null
	}
}
