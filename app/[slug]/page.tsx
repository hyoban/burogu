import { Giscus } from '@/app/components/Comment'
import { getPostList } from '@/lib/notion'

import PostDetail from '../components/PostDetail'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-4">
      {/* @ts-expect-error Server Component */}
      <PostDetail slug={params.slug} />
      <Giscus />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getPostList()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
