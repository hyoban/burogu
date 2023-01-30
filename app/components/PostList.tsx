import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'

import { getPostList } from '@/lib/notion'

export default async function PostList() {
  const posts = await getPostList()

  return (
    <>
      {posts.map((post) => (
        <Link
          href={'/post/' + post.slug}
          key={post.id}
          className="flex w-full flex-col gap-3 overflow-clip rounded-lg border no-underline hover:opacity-100 dark:border-gray-600">
          <Image
            className="h-auto w-full"
            src={post.cover.url}
            alt="post cover"
            width={post.cover.width}
            height={post.cover.height}
          />
          <p className="mx-4 ">{post.title}</p>
          <p className="mx-4 mb-4 text-sm text-gray-500">
            {dayjs(post.publishedTime).format('YYYY/MM/DD')}
          </p>
        </Link>
      ))}
    </>
  )
}
