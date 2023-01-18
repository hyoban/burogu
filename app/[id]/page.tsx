import './prose.css'

import { getPost, getPosts } from '@/lib/notion'

export default async function Page({ params }: { params: { id: string } }) {
  const page = await getPost(params.id)
  return (
    <div className="prose mb-10">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    id: post.id,
  }))
}
