import FeedInfoList from "@/app/components/FeedInfoList"
import FeedInfoLoading from "@/app/components/FeedInfoLoading"
import FeedList from "@/app/components/FeedList"
import FeedListLoading from "@/app/components/FeedListLoading"
import { ScrollArea } from "@/app/components/ScrollArea"
import { getFeedInfoList, getFeedList } from "@/lib/notion"
import { Suspense } from "react"

export const revalidate = 100

export async function FeedListInServer() {
	const feedInfoList = await getFeedInfoList()
	if (!feedInfoList) return null
	const feedList = await getFeedList(feedInfoList)
	if (!feedList) return null

	return <FeedList feedList={feedList} />
}

export default async function FeedListPage({}) {
	return (
		<>
			<Suspense fallback={<FeedListLoading />}>
				{/* @ts-expect-error Server Component */}
				<FeedListInServer />
			</Suspense>
			<div className="absolute top-0 right-0 translate-x-[130%] ">
				<ScrollArea className="h-[500px] rounded-md border border-neutral-200 dark:border-neutral-700 p-4 w-56 hidden xl:block">
					<Suspense fallback={<FeedInfoLoading />}>
						{/* @ts-expect-error Server Component */}
						<FeedInfoList />
					</Suspense>
				</ScrollArea>
			</div>
		</>
	)
}

export const metadata = {
	title: "订阅列表",
}
