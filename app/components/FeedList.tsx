import { FeedListType } from '@/lib/notion'
import { timeZone } from '@/site.config.cjs'
import dayjs from 'dayjs'

export default function FeedList({ feedList }: { feedList: FeedListType }) {
  const feedListGroupedByYear = feedList.reduce((acc, feed) => {
    const feedYear = dayjs(feed.isoDate).tz(timeZone).format('YYYY')
    if (!acc[feedYear]) {
      acc[feedYear] = []
    }
    acc[feedYear].push(feed)
    return acc
  }, {} as Record<string, typeof feedList>)

  return (
    <>
      {Object.keys(feedListGroupedByYear)
        .sort((a, b) => Number(b) - Number(a))
        .map((feedYear) => {
          const feedListByYear = feedListGroupedByYear[feedYear]
          return (
            <div key={feedYear}>
              <h2 className="my-3 text-3xl opacity-50">{feedYear}</h2>
              <div className="flex flex-col gap-3">
                {feedListByYear.map((feed) => (
                  <div
                    key={feed.link}
                    className="flex w-full flex-row items-center justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <p className="text-sm text-gray-500" title={feed.isoDate}>
                        {dayjs(feed.isoDate).tz(timeZone).format('MM/DD')}
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
