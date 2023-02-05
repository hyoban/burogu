export interface NotionPost {
  id: string
  title: string
  slug: string
  tags: string[]
  publishedTime: string
  cover: {
    url: string
    width?: number
    height?: number
  }
  description: string
}
