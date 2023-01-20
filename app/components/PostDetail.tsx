import { getSinglePostContent, getSinglePostInfo } from '@/lib/notion'

import PostContent from './PostContent'

export default async function PostDetail({ id }: { id: string }) {
  const [page, blocks] = await Promise.all([
    getSinglePostInfo(id),
    getSinglePostContent(id),
  ])

  if (!page) {
    return <div className="text-center my-20">Post Not found</div>
  }
  return (
    <>
      <h1 className="my-20">{page.title}</h1>
      {/* @ts-expect-error Server Component */}
      <PostContent blocks={blocks} />
    </>
  )
}
