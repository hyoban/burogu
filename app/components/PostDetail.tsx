import Image from 'next/image'

import { getSinglePostContent, getSinglePostInfo } from '@/lib/notion'
import PostContent from './PostContent'

export default async function PostDetail({ slug }: { slug: string }) {
  const [page, blocks] = await Promise.all([
    getSinglePostInfo(slug, true),
    getSinglePostContent(slug, true),
  ])

  if (!page) {
    return <div className="my-20 text-center">Post Not found</div>
  }
  return (
    <>
      <Image
        className="h-auto w-full rounded-lg"
        src={page.cover.url}
        alt="post cover"
        width={page.cover.width}
        height={page.cover.height}
      />
      <h1 className="my-4 self-start text-4xl">{page.title}</h1>
      {/* @ts-expect-error Server Component */}
      <PostContent blocks={blocks} />
    </>
  )
}
