import dayjs from 'dayjs'

import { getPosts } from '@/lib/notion'

import Link from 'next/link'

export default async function PostList() {
  const posts = await getPosts()
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="flex justify-between w-full">
          <Link
            href={'/' + post.id}
            className="underline decoration-dashed underline-offset-4">
            {post.title}
          </Link>
          <p>{dayjs(post.createdTime).format('YYYY/MM/DD')}</p>
        </div>
      ))}
    </>
  )
}
