import { NotionPost } from './notionType'
import { Client } from '@notionhq/client'
import {
  BlockObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

const notionToken = process.env.NOTION_TOKEN!
const databaseId = process.env.NOTION_DATABASE_ID!

const notion = new Client({
  auth: notionToken,
})
export const getPostList = async (): Promise<NotionPost[]> => {
  const response = await notion.databases.query({
    database_id: databaseId,
  })
  return response.results
    .map((i) => {
      const page = i as PageObjectResponse
      const title = (page as any).properties.Name.title[0].plain_text
      const tags = (page as any).properties.Tags.multi_select.map(
        (i: any) => i.name,
      ) as string[]
      return {
        id: i.id,
        title,
        url: page.url,
        tags,
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
      }
    })
    .filter((i) => i.tags.includes('published'))
}

export const getSinglePostInfo = async (pageId: string) => {
  if (pageId === 'sw.js') return null
  const page = await notion.pages.retrieve({ page_id: pageId })
  return {
    id: page.id,
    title: (page as any).properties.Name.title[0].plain_text,
  }
}

export const getSinglePostContent = async (blockId: string) => {
  const blocks = []
  let cursor
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: blockId,
    })
    blocks.push(...(results as BlockObjectResponse[]))
    if (!next_cursor) {
      break
    }
    cursor = next_cursor
  }
  return blocks
}

export type PostContentType = Awaited<ReturnType<typeof getSinglePostContent>>
