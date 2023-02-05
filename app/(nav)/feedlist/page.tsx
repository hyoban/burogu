import { Suspense } from 'react'

import FeedList from '@/app/components/FeedList'

export const revalidate = 1

export default function FeedListPage({}) {
  return (
    <Suspense fallback={<div>Loading my feed list...</div>}>
      {/* @ts-expect-error Server Component */}
      <FeedList />
    </Suspense>
  )
}
