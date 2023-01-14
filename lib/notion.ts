import { NotionPage } from './notionType'
import { Client } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notionToken = process.env.NOTION_TOKEN

const notion = new Client({
  auth: notionToken,
})

export const getPosts = async (databaseId: string): Promise<NotionPage[]> => {
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
