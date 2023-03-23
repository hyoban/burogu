import FeedInfoList from "@/app/components/FeedInfoList"
import FeedList from "@/app/components/FeedList"
import { getFeedInfoList, getFeedList } from "@/lib/notion"
import { Suspense } from "react"

export const revalidate = 100

async function FeedListServer({}) {
	const feedInfoList = await getFeedInfoList()
	if (!feedInfoList) return null
	const feedList = await getFeedList(feedInfoList)
	if (!feedList) return null
	return <FeedList feedList={feedList} />
}

export default async function FeedListPage({}) {
	return (
		<article className="relative my-8 flex w-full flex-col gap-4">
			<Suspense fallback={<p>Loading FeedInfoList...</p>}>
				{/* @ts-expect-error Server Component */}
				<FeedListServer />
			</Suspense>
			{/* @ts-expect-error Server Component */}
			<FeedInfoList />
		</article>
	)
}

export const metadata = {
	title: "订阅列表",
}
