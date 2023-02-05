import { Suspense } from 'react'

import FeedList from '@/app/components/FeedList'
import { getFeedList } from '@/lib/notion'

export const revalidate = 1

export default async function FeedListPage({}) {
  const feedList = await getFeedList()

  if (!feedList) return null
  return (
    <Suspense fallback={<div>Loading my feed list...</div>}>
      <FeedList feedList={feedList} />
    </Suspense>
  )
}
