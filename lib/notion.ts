import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

import SITE_CONFIG from "@/config/site.config"
import {
	BlockObjectResponse,
	ListBlockChildrenResponse,
	PageObjectResponse,
	QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints"

export interface NotionPost {
	id: string
	title: string
	publishedTime: string
	updatedTime: string
}

const { timeZone } = SITE_CONFIG

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(timeZone)

const notionToken = process.env.NOTION_TOKEN as string
const databaseId = process.env.NOTION_DATABASE_ID as string

const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
	"Notion-Version": "2022-06-28",
	Authorization: `Bearer ${notionToken}`,
}

async function getPostInfo(page: PageObjectResponse): Promise<NotionPost> {
	return {
		id: page.id,
		publishedTime: page.created_time,
		updatedTime: page.last_edited_time,
		title:
			page.properties.Name.type === "title"
				? page.properties.Name.title[0].plain_text
				: "",
	}
}

export async function getPostList(): Promise<NotionPost[] | undefined> {
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
			(response.results as PageObjectResponse[]).map(getPostInfo)
		)
	} catch (e) {
		console.error("getPostList", e)
	}
}

export async function getSinglePostInfo(pageId: string) {
	try {
		const page = (await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
			method: "GET",
			headers,
		}).then((i) => i.json())) as PageObjectResponse

		return await getPostInfo(page)
	} catch (e) {
		console.warn(`[getSinglePostInfo]: post ${pageId} not found`)
		return null
	}
}

export type Block = {
	cur: BlockObjectResponse
	children?: Block[]
}

export async function getSinglePostContent(
	blockId: string
): Promise<Block[] | null> {
	try {
		const blocks: Block[] = []
		let cursor
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
							children: await getSinglePostContent(i.id),
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

export type PostContentType = NonNullable<
	Awaited<ReturnType<typeof getSinglePostContent>>
>
