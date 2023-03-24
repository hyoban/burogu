import { Suspense } from "react"

import FadeInAndOut from "@/app/components/FadeInAndOut"
import PostList from "@/app/components/PostList"

export default function PostListPage({}) {
	return (
		<FadeInAndOut>
			<article className="relative my-8 flex w-full flex-col gap-4">
				<Suspense fallback={<div>Loading post list...</div>}>
					{/* @ts-expect-error Server Component */}
					<PostList />
				</Suspense>
			</article>
		</FadeInAndOut>
	)
}

export const metadata = {
	title: "文章",
}
