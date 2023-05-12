import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

import SITE_CONFIG from "@/site.config"
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
}

const { timeZone } = SITE_CONFIG

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(timeZone)

const notionToken = process.env.NOTION_TOKEN!
const databaseId = process.env.NOTION_DATABASE_ID!

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
		title: (page as any).properties.Name.title[0].plain_text as string,
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
	if (pageId === "sw.js") return null

	try {
		const page = (await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
			method: "GET",
			headers,
		}).then((i) => i.json())) as PageObjectResponse

		return await getPostInfo(page)
	} catch (e) {
		console.log("getSinglePostInfo", e)
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

export interface TOCItem {
	title: string
	level: number
	children: TOCItem[]
}

export function getTOCFromBlocks(blocks: Block[]) {
	const toc: TOCItem[] = []

	for (const block of blocks) {
		const type = block.cur.type
		if (type === "heading_2") {
			const title = block.cur.heading_2.rich_text
				.map((t) => t.plain_text)
				.join("")
			toc.push({
				title,
				children: [],
				level: 2,
			})
		} else if (type === "heading_3") {
			const title = block.cur.heading_3.rich_text
				.map((t) => t.plain_text)
				.join("")
			if (toc.length !== 0 && toc.at(-1)?.level === 2) {
				toc.at(-1)?.children.push({
					title,
					children: [],
					level: 3,
				})
			} else {
				toc.push({
					title,
					children: [],
					level: 3,
				})
			}
		}
	}

	return toc
}
