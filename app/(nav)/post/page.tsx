import { Suspense } from "react"

import FadeInAndOut from "@/app/components/FadeInAndOut"
import PostList from "@/app/components/PostList"

export default function PostListPage({}) {
	return (
		<article className="relative my-8 flex w-full flex-col gap-4">
			<FadeInAndOut>
				<Suspense fallback={<div>Loading post list...</div>}>
					{/* @ts-expect-error Server Component */}
					<PostList />
				</Suspense>
			</FadeInAndOut>
		</article>
	)
}

export const metadata = {
	title: "文章",
}
