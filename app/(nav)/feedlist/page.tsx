import Image from 'next/image'

import FeedList from '@/app/components/FeedList'
import { getFeedInfoList, getFeedList } from '@/lib/notion'

export const revalidate = 100

export default async function FeedListPage({}) {
  const feedInfoList = await getFeedInfoList()
  if (!feedInfoList) return null
  const feedList = await getFeedList(feedInfoList)
  if (!feedList) return null

  return (
    <>
      <FeedList feedList={feedList} />
      <div className="absolute top-0 right-0 hidden translate-x-full flex-col gap-4 px-20 2xl:flex">
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
    </>
  )
}
