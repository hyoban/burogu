import { Giscus } from "@/app/components/Comment"
import PostDetail from "@/app/components/PostDetail"
import SharedElement from "@/app/components/SharedElement"
import { getPostList, getSinglePostInfo } from "@/lib/notion"
import { Metadata } from "next"
import Image from "next/image"

export default async function Page({ params }: { params: { slug: string } }) {
	const page = await getSinglePostInfo(params.slug, true)
	if (!page) return null
	return (
		<>
			<SharedElement
				layoutId={`post-cover-${page.id}`}
				className="absolute top-0 left-0 right-0 sm:static"
			>
				<Image
					className="h-auto w-full  sm:rounded-lg"
					src={page.cover.url}
					alt="post cover"
					width={page.cover.width}
					height={page.cover.height}
				/>
			</SharedElement>
			<div className="mx-auto flex w-full flex-col items-center gap-4 mt-20 sm:mt-0">
				<h1 className="my-6 self-start text-4xl">{page.title}</h1>
				{/* @ts-expect-error Server Component */}
				<PostDetail slug={params.slug} />
				<Giscus />
			</div>
		</>
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
}): Promise<Metadata> {
	const page = await getSinglePostInfo(params.slug, true)

	return { title: page?.title, description: page?.description }
}
