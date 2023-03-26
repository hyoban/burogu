import PostList from "@/app/components/PostList"
import { Suspense } from "react"

export default function PostListPage({}) {
	return (
		<article className="relative my-8 flex w-full flex-col gap-4">
			<Suspense fallback={<div>Loading post list...</div>}>
				{/* @ts-expect-error Server Component */}
				<PostList />
			</Suspense>
		</article>
	)
}

export const metadata = {
	title: "文章",
}
