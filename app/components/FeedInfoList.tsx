import { getFeedInfoList } from '@/lib/notion'
import Image from 'next/image'

export default async function FeedInfoList({}) {
  const feedInfoList = await getFeedInfoList()
  if (!feedInfoList) return null

  return (
    <div className="absolute top-0 right-0 hidden translate-x-full flex-col gap-4 px-20 xl:flex">
      {feedInfoList
        // sort by title
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((feedInfo) => (
          <div key={feedInfo.id} className="flex items-center gap-4">
            <Image
              src={feedInfo.avatar}
              alt="feed item avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <a href={feedInfo.url} target="_blank" rel="noopener noreferrer">
              {feedInfo.title}
            </a>
          </div>
        ))}
    </div>
  )
}
