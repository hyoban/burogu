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
  try {
    const page = await notion.pages.retrieve({ page_id: pageId })
    return {
      id: page.id,
      title: (page as any).properties.Name.title[0].plain_text,
    }
  } catch (e) {
    return null
  }
}

export type Block = {
  cur: BlockObjectResponse
  children?: Block[]
}

export const getSinglePostContent = async (
  blockId: string,
): Promise<Block[] | null> => {
  try {
    const blocks: Block[] = []
    let cursor
    while (true) {
      const response = await notion.blocks.children.list({
        start_cursor: cursor,
        block_id: blockId,
      })
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
        }),
      )
      blocks.push(...(resultsWithChildren as Block[]))
      if (!response.next_cursor) {
        break
      }
      cursor = response.next_cursor
    }
    return blocks
  } catch (e) {
    return null
  }
}

export type PostContentType = NonNullable<
  Awaited<ReturnType<typeof getSinglePostContent>>
>
