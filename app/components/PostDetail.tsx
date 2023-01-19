import { Suspense } from 'react'

import { getSinglePostInfo } from '@/lib/notion'

import PostContent from './PostContent'

export default async function PostDetail({ id }: { id: string }) {
  const page = await getSinglePostInfo(id)
  if (!page) {
    return <div>Post Not found</div>
  }
  return (
    <>
      <h1>{page.title}</h1>
      <Suspense fallback={<div>Loading Post Content...</div>}>
        {/* @ts-expect-error Server Component */}
        <PostContent id={page.id} />
      </Suspense>
    </>
  )
}
