import Card from "@/app/components/ui/Card"
import Link from "@/app/components/ui/Link"
import SharedElement from "@/app/components/ui/SharedElement"
import { getPostList } from "@/lib/notion"
import { timeZone } from "@/site.config.cjs"
import dayjs from "dayjs"
import Image from "next/image"

export default async function PostList() {
	const posts = await getPostList()
	if (!posts) return null

	return (
		<>
			{posts.map((post) => (
				<Card
					key={post.id}
					className="overflow-clip rounded-lg border dark:border-gray-600"
				>
					<Link
						href={`/post/${post.slug}`}
						className="flex w-full flex-col gap-4"
					>
						<SharedElement layoutId={`post-cover-${post.id}`}>
							<Image
								className="h-auto w-full"
								src={post.cover.url}
								alt="post cover"
								width={post.cover.width}
								height={post.cover.height}
							/>
						</SharedElement>
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
				</Card>
			))}
		</>
	)
}
