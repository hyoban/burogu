import "@/lib/dayjs"

import { getPostList } from "@/lib/notion"
import dayjs from "dayjs"
import Link from "next/link"

export const revalidate = 60

export default async function Page() {
	const posts = await getPostList()
	if (!posts) return <div>Nothing found.</div>

	return (
		<ul className="space-y-2 sm:space-y-0">
			{posts.map((post) => (
				<li
					key={post.id}
					className="flex flex-col gap-2 sm:flex-row sm:items-center"
				>
					<time
						dateTime={post.publishedTime}
						title={post.publishedTime}
						className="font-mono text-sm text-neutral-500 dark:text-neutral-400"
					>
						{dayjs(post.publishedTime).format(
							dayjs(post.publishedTime).isSame(dayjs(), "year")
								? "MMM D"
								: "MMM D, YYYY"
						)}
					</time>
					<Link
						href={`/post/${post.id}`}
						className="w-fit -translate-x-2 rounded-md px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 sm:translate-x-0 sm:px-4 sm:py-2"
					>
						{post.title}
					</Link>
				</li>
			))}
		</ul>
	)
}
