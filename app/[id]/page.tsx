import { Suspense } from 'react'

import { getPosts } from '@/lib/notion'

import PostDetail from '../components/PostDetail'
import Loading from './loading'

export const revalidate = 3600

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<Loading />}>
      {/* @ts-expect-error Server Component */}
      <PostDetail id={params.id} />
    </Suspense>
  )
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    id: post.id,
  }))
}
