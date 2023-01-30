import Link from 'next/link'
import dayjs from 'dayjs'

import { getPostList } from '@/lib/notion'

export default async function PostList() {
  const posts = await getPostList()

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={'/' + post.slug}
            className="underline decoration-dashed underline-offset-4">
            {post.title}
          </Link>
          <p className="text-sm text-gray-500">
            {dayjs(post.publishedTime).format('YYYY/MM/DD')}
          </p>
        </div>
      ))}
    </>
  )
}
