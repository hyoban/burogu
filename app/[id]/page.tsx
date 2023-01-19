import { Suspense } from 'react'

import { getPostList } from '@/lib/notion'

import PostDetail from '../components/PostDetail'

export const revalidate = 60

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="prose mb-10">
      <Suspense fallback={<h1 className="prose">Loading...</h1>}>
        {/* @ts-expect-error Server Component */}
        <PostDetail id={params.id} />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getPostList()

  return posts.map((post) => ({
    id: post.id,
  }))
}
