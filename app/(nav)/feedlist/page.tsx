import FeedList from '@/app/components/FeedList'
import { getFeedList } from '@/lib/notion'

export const revalidate = 100

export default async function FeedListPage({}) {
  const feedList = await getFeedList()

  if (!feedList) return null
  return <FeedList feedList={feedList} />
}
