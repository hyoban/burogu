import { getPostList } from "@/lib/notion"
import SITE_CONFIG from "@/site.config"
import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"

const { timeZone } = SITE_CONFIG

export default async function PostList() {
	const posts = await getPostList()
	if (!posts) return null

	return (
		<>
			{posts.map((post) => (
				<Link
					key={post.id}
					href={`/post/${post.slug}`}
					className="flex w-full flex-col my-4 gap-4 overflow-clip rounded-lg border dark:border-gray-600 transition-transform hover:scale-[1.02] duration-200"
				>
					<Image
						className="h-auto w-full"
						src={post.cover.url}
						alt="post cover"
						width={post.cover.width}
						height={post.cover.height}
					/>
					<p className="mx-4 text-xl opacity-90">{post.title}</p>
					<p className="mx-4 text-sm opacity-60">{post.description}</p>
					<p
						className="mx-4 mb-4 text-sm opacity-50"
						title={post.publishedTime}
					>
						{dayjs(post.publishedTime).tz(timeZone).format("YYYY/MM/DD")}{" "}
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="mx-1 rounded py-[0.2rem] px-[0.3rem] font-mono text-sm bg-neutral-100 dark:bg-neutral-800"
							>
								#{tag}
							</span>
						))}
					</p>
				</Link>
			))}
		</>
	)
}
