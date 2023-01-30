import dayjs from 'dayjs'

import { getFeedList } from '@/lib/notion'

export default async function FeedList() {
  const feedList = await getFeedList()

  return (
    <>
      {feedList.map((feed) => (
        <div
          key={feed.link}
          className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex flex-col gap-3">
            <a
              href={feed.link ?? '/'}
              target="_blank"
              rel="noopener noreferrer">
              {feed.title}
            </a>
            <p className="text-sm text-gray-500">
              {dayjs(feed.isoDate).format('YYYY/MM/DD')}
            </p>
          </span>
          <a
            href={feed.feedInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 no-underline">
            {feed.feedInfo.title}
          </a>
        </div>
      ))}
    </>
  )
}
