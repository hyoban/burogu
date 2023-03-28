import PostList from "@/app/components/PostList"
import { Suspense } from "react"

export default function PostListPage({}) {
	return (
		<Suspense fallback={<div>Loading post list...</div>}>
			{/* @ts-expect-error Server Component */}
			<PostList />
		</Suspense>
	)
}

export const metadata = {
	title: "文章",
}
