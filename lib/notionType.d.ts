export interface NotionPage {
  id: string
  title: string
  url: string
  tags: string[]
  createdTime: string
  lastEditedTime: string
}

export interface NotionPageWithContent {
  id: string
  title: string
  content: string
}
