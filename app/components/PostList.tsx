import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import { getPostList } from '@/lib/notion'

export default async function PostList() {
  const posts = await getPostList()
  if (!posts) return null

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
          <p className="mx-4 text-2xl">{post.title}</p>
          <p className="mx-4 opacity-70">{post.description}</p>
          <p className="mx-4 mb-4 text-sm opacity-50">
            {dayjs(post.publishedTime).format('YYYY/MM/DD')}{' '}
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="mx-1 rounded bg-slate-100 py-[0.2rem] px-[0.3rem] font-mono text-sm dark:bg-slate-800">
                #{tag}
              </span>
            ))}
          </p>
        </Link>
      ))}
    </>
  )
}
