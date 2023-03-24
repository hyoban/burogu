import { getSinglePostContent } from "@/lib/notion"
import PostContent from "./PostContent"

export default async function PostDetail({ slug }: { slug: string }) {
	const blocks = await getSinglePostContent(slug, true)

	if (!blocks) {
		return <div className="my-20 text-center">Post Not found</div>
	}
	return (
		<>
			{/* @ts-expect-error Server Component */}
			<PostContent blocks={blocks} />
		</>
	)
}
