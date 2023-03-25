"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/Select"

import { FeedListType } from "@/lib/notion"
import { timeZone } from "@/site.config.cjs"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { useState } from "react"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(timeZone)

export default function FeedList({ feedList }: { feedList: FeedListType }) {
	const typeList = ["All"].concat(
		feedList.map((i) => i.type).filter((v, i, a) => a.indexOf(v) === i)
	)

	const [type, setType] = useState("All")

	const feedListGroupedByYear = feedList
		.filter((feed) => {
			if (type === "All") return true
			return feed.type === type
		})
		.reduce((acc, feed) => {
			const feedYear = dayjs(feed.isoDate).tz(timeZone).format("YYYY")
			if (!acc[feedYear]) {
				acc[feedYear] = []
			}
			acc[feedYear].push(feed)
			return acc
		}, {} as Record<string, typeof feedList>)

	return (
		<>
			<div className="my-2 flex items-center gap-4">
				<label className="text-gray-700 dark:text-white">分类</label>
				<Select
					value={type}
					onValueChange={(e) => {
						setType(e)
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue>{type}</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{typeList.map((type) => (
							<SelectItem key={type} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{Object.keys(feedListGroupedByYear)
				.sort((a, b) => Number(b) - Number(a))
				.map((feedYear) => {
					const feedListByYear = feedListGroupedByYear[feedYear]
					return (
						<div key={feedYear} className="my-2">
							<h2 className="my-3 text-3xl opacity-50">{feedYear}</h2>
							<div className="flex flex-col gap-3">
								{feedListByYear.map((feed) => (
									<div
										key={feed.link}
										className="flex w-full flex-row items-center justify-between gap-3"
									>
										<span className="flex items-center gap-3">
											<p className="text-sm opacity-50" title={feed.isoDate}>
												{dayjs(feed.isoDate).tz(timeZone).format("MM/DD")}
											</p>
											<a
												href={feed.link ?? "/"}
												target="_blank"
												rel="noopener noreferrer"
											>
												{feed.title}
											</a>
										</span>
										<span
											title={feed.homeTitle}
											className="hidden w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-right opacity-50 sm:inline"
										>
											{feed.homeTitle}
										</span>
									</div>
								))}
							</div>
						</div>
					)
				})}
		</>
	)
}
