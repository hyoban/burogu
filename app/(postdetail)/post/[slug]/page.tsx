import { Giscus } from "@/app/components/Comment"
import PostDetail from "@/app/components/PostDetail"
import { getPostList, getSinglePostInfo } from "@/lib/notion"
import config from "@/site.config.cjs"

export default function Page({ params }: { params: { slug: string } }) {
	return (
		<div className="mx-auto flex w-full flex-col items-center gap-4">
			{/* @ts-expect-error Server Component */}
			<PostDetail slug={params.slug} />
			<Giscus />
		</div>
	)
}

export async function generateStaticParams() {
	const posts = await getPostList()
	if (!posts) return []

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}) {
	const page = await getSinglePostInfo(params.slug, true)

	return { title: page?.title + " | " + config.siteName }
}
