import ScrollIn from "@/app/components/ui/ScrollIn"
import { getFeedInfoList } from "@/lib/notion"
import Image from "next/image"

export default async function FeedInfoList({}) {
	const feedInfoList = await getFeedInfoList()
	if (!feedInfoList) return null

	return (
		<>
			{feedInfoList
				// sort by title
				.sort((a, b) => a.title.localeCompare(b.title))
				.map((feedInfo) => (
					<ScrollIn key={feedInfo.id} className="flex items-center gap-4 my-2">
						<Image
							src={feedInfo.avatar}
							alt="feed item avatar"
							width={40}
							height={40}
							className="h-[40px] w-[40px] rounded-full object-cover"
						/>
						<a href={feedInfo.url} target="_blank" rel="noopener noreferrer">
							{feedInfo.title}
						</a>
					</ScrollIn>
				))}
		</>
	)
}
