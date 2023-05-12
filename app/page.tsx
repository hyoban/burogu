import "@/lib/dayjs"

import { getPostList } from "@/lib/notion"
import SITE_CONFIG from "@/site.config"
import dayjs from "dayjs"
import Link from "next/link"

const { timeZone } = SITE_CONFIG

export default async function Page() {
	const posts = await getPostList()
	if (!posts) return <div>Nothing found.</div>

	return (
		<ul className="space-y-4">
			{posts.map((post) => (
				<li key={post.id} className="flex gap-6">
					<time dateTime={post.publishedTime} className="font-mono">
						{dayjs(post.publishedTime).tz(timeZone).format("YYYY/MM/DD")}
					</time>
					<Link
						href={`/post/${post.slug}`}
						className="underline underline-offset-[6px] decoration-dashed hover:decoration-solid"
					>
						{post.title}
					</Link>
				</li>
			))}
		</ul>
	)
}
