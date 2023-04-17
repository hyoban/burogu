"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/Select"
import { FeedListType } from "@/lib/notion"
import SITE_CONFIG from "@/site.config"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { AnimatePresence, motion } from "framer-motion"
import { atom, useAtom } from "jotai"

const { timeZone } = SITE_CONFIG

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(timeZone)

const typeFilterAtom = atom("all")

function FeedTypeSelector({ typeList }: { typeList: string[] }) {
	const [type, setType] = useAtom(typeFilterAtom)
	return (
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
	)
}

export default function FeedList({ feedList }: { feedList: FeedListType }) {
	const typeList = ["all"].concat(
		feedList.map((i) => i.type).filter((v, i, a) => a.indexOf(v) === i)
	)
	const [type] = useAtom(typeFilterAtom)
	const feedListGroupedByYearAndMonth = feedList
		.filter((feed) => {
			if (type === "all") return true
			return feed.type === type
		})
		.reduce((acc, feed) => {
			const feedYearWithMonth = dayjs(feed.isoDate)
				.tz(timeZone)
				.format("YYYY MM")
			if (!acc[feedYearWithMonth]) {
				acc[feedYearWithMonth] = []
			}
			acc[feedYearWithMonth].push(feed)
			return acc
		}, {} as Record<string, typeof feedList>)

	return (
		<>
			<FeedTypeSelector typeList={typeList} />
			{Object.keys(feedListGroupedByYearAndMonth)
				.sort((a, b) => Number(b) - Number(a))
				.map((feedYear) => {
					const feedListByYear = feedListGroupedByYearAndMonth[feedYear]
					return (
						<div key={feedYear} className="my-2">
							<h2 className="my-3 text-3xl opacity-50">{feedYear}</h2>
							<div className="flex flex-col gap-3">
								<AnimatePresence initial={false}>
									{feedListByYear.map((feed) => (
										<motion.div
											key={feed.link}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											transition={{ duration: 0.2 }}
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
										</motion.div>
									))}
								</AnimatePresence>
							</div>
						</div>
					)
				})}
		</>
	)
}
