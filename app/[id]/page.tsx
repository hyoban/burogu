import { getPostList } from '@/lib/notion'

import PostDetail from '../components/PostDetail'

export const revalidate = 60

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-[65ch] mx-auto">
      {/* @ts-expect-error Server Component */}
      <PostDetail id={params.id} />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getPostList()

  return posts.map((post) => ({
    id: post.id,
  }))
}
