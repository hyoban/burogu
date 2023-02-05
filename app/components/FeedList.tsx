import dayjs from 'dayjs'

import { getFeedList } from '@/lib/notion'

export default async function FeedList() {
  const feedList = await getFeedList()

  if (!feedList) return null

  return (
    <>
      {Object.keys(feedList)
        .sort((a, b) => Number(b) - Number(a))
        .map((feedYear) => {
          const feedListByYear = feedList[feedYear]
          return (
            <div key={feedYear}>
              <h2 className="my-3 text-3xl opacity-50">{feedYear}</h2>
              <div className="flex flex-col gap-3">
                {feedListByYear.map((feed) => (
                  <div
                    key={feed.link}
                    className="flex w-full flex-row items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <p className="text-sm text-gray-500">
                        {dayjs(feed.isoDate).format('MM/DD')}
                      </p>
                      <a
                        href={feed.link ?? '/'}
                        target="_blank"
                        rel="noopener noreferrer">
                        {feed.title}
                      </a>
                    </span>
                    <a
                      href={feed.feedInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden text-gray-500 no-underline sm:inline">
                      {feed.feedInfo.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
    </>
  )
}
