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
            src={post.cover}
            alt="post cover"
            sizes="100vw"
            width={0}
            height={0}
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
