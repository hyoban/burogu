import MarkdownIt from 'markdown-it'
import { NotionToMarkdown } from 'notion-to-md'
import shiki from 'shiki'

import { NotionPage, NotionPageWithContent } from './notionType'
import { Client } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notionToken = process.env.NOTION_TOKEN!
const databaseId = process.env.NOTION_DATABASE_ID!

const notion = new Client({
  auth: notionToken,
})
const n2m = new NotionToMarkdown({ notionClient: notion })

export const getPosts = async (): Promise<NotionPage[]> => {
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

const lightCodeTheme = 'github-light'
const darkCodeTheme = 'github-dark-dimmed'

export const getPost = async (
  pageId: string,
): Promise<NotionPageWithContent> => {
  const highlighter = await shiki.getHighlighter({
    themes: [lightCodeTheme, darkCodeTheme],
  })
  const md = new MarkdownIt({
    highlight: (str, lang) => {
      const light = highlighter.codeToHtml(str, lang || 'text', lightCodeTheme)
      const dark = highlighter.codeToHtml(str, lang || 'text', darkCodeTheme)
      return `<div class="shiki-container"><div class="shiki-light">${light}</div><div class="shiki-dark">${dark}</div></div>`
    },
  })
  const [page, mdblocks] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }),
    n2m.pageToMarkdown(pageId),
  ])
  const pageInMarkdown = n2m.toMarkdownString(mdblocks)
  const pageInHtml = md.render(pageInMarkdown)
  return {
    id: page.id,
    title: (page as any).properties.Name.title[0].plain_text,
    content: pageInHtml,
  }
}
