import './prose.css'

import { getPost, getPosts } from '@/lib/notion'

const databaseId = process.env.NOTION_DATABASE_ID as string

export default async function Page({ params }: { params: { id: string } }) {
  const posts = await getPosts(databaseId)
  if (!posts.find((post) => post.id === params.id))
    return <div>Post not found</div>
  const page = await getPost(params.id)
  return (
    <div className="prose mb-10">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
    </div>
  )
}
