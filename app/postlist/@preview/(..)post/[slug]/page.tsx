import PostContent from "@/app/components/part/PostContent"
import { getPostList, getSinglePostContent } from "@/lib/notion"
import PostPreview from "./PostPreview"

export default async function Page({ params }: { params: { slug: string } }) {
	const fetchBlocks = await getSinglePostContent(params.slug, true)

	if (!fetchBlocks) {
		return null
	}

	return (
		<PostPreview>
			{/* @ts-expect-error Server Component */}
			<PostContent blocks={fetchBlocks.slice(0, 7)} removeAnchor />
		</PostPreview>
	)
}

export async function generateStaticParams() {
	const posts = await getPostList()
	if (!posts) return []

	return posts.map((post) => ({
		slug: post.slug,
	}))
}
