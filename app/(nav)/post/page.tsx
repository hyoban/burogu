import PostList from "@/app/components/PostList"

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
