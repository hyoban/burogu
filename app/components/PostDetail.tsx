import { getSinglePostContent, getSinglePostInfo } from '@/lib/notion'

import PostContent from './PostContent'

export default async function PostDetail({ slug }: { slug: string }) {
  const [page, blocks] = await Promise.all([
    getSinglePostInfo(slug, true),
    getSinglePostContent(slug, true),
  ])

  if (!page) {
    return <div className="text-center my-20">Post Not found</div>
  }
  return (
    <>
      <h1 className="text-3xl mt-4 mb-6">{page.title}</h1>
      {/* @ts-expect-error Server Component */}
      <PostContent blocks={blocks} />
    </>
  )
}
