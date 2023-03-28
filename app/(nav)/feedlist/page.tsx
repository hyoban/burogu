import FeedInfoList from "@/app/components/FeedInfoList"
import FeedList from "@/app/components/FeedList"
import { getFeedInfoList, getFeedList } from "@/lib/notion"

export const revalidate = 100

export default async function FeedListPage({}) {
	const feedInfoList = await getFeedInfoList()
	if (!feedInfoList) return null
	const feedList = await getFeedList(feedInfoList)
	if (!feedList) return null
	return (
		<>
			<FeedList feedList={feedList} />
			<FeedInfoList feedInfoList={feedInfoList} />
		</>
	)
}

export const metadata = {
	title: "订阅列表",
}
