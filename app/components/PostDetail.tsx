import { getPost } from '@/lib/notion'

export default async function PostDetail({ id }: { id: string }) {
  const page = await getPost(id)
  return (
    <div className="prose mb-10">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
    </div>
  )
}
