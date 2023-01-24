import dayjs from 'dayjs'

import { getPostList } from '@/lib/notion'

import Link from 'next/link'

export default async function PostList() {
  const posts = await getPostList()
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="flex w-full justify-between">
          <Link
            href={'/' + post.slug}
            className="underline decoration-dashed underline-offset-4">
            {post.title}
          </Link>
          <p>{dayjs(post.publishedTime).format('YYYY/MM/DD')}</p>
        </div>
      ))}
    </>
  )
}
