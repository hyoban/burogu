import { getPostList } from '@/lib/notion'

import PostDetail from '../components/PostDetail'

export const revalidate = 60

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="flex flex-col items-center">
      {/* @ts-expect-error Server Component */}
      <PostDetail slug={params.slug} />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getPostList()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
