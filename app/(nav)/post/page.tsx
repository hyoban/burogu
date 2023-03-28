import PostList from "@/app/components/part/PostList"

export default function PostListPage({}) {
	return (
		<>
			{/* @ts-expect-error Server Component */}
			<PostList />
		</>
	)
}

export const metadata = {
	title: "文章",
}
