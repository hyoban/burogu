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
    .filter(
      (i) =>
        (i as any).properties['Published time'].date &&
        (i as any).properties.Slug.rich_text.length > 0,
    )
    .map((i) => {
      const page = i as PageObjectResponse
      const title = (page as any).properties.Name.title[0].plain_text
      const tags = (page as any).properties.Tags.multi_select.map(
        (i: any) => i.name,
      ) as string[]
      return {
        id: i.id,
        title,
        tags,
        publishedTime: (page.properties['Published time'] as any).date?.start,
        slug: (page.properties.Slug as any).rich_text[0].plain_text,
      }
    })
}

export const getSinglePostInfo = async (pageId: string, isSlug = false) => {
  if (pageId === 'sw.js') return null

  if (isSlug) {
    const postList = await getPostList()
    const post = postList.find((i) => i.slug === pageId)
    if (post) {
      return {
        id: post.id,
        title: post.title,
      }
    }
    return null
  }

  try {
    const page = await notion.pages.retrieve({ page_id: pageId })
    return {
      id: page.id,
      title: (page as any).properties.Name.title[0].plain_text as string,
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
  isSlug = false,
): Promise<Block[] | null> => {
  if (isSlug) {
    const postList = await getPostList()
    const post = postList.find((i) => i.slug === blockId)
    if (post) {
      return getSinglePostContent(post.id)
    }
    return null
  }

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
