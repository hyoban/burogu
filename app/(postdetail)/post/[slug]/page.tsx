import { Giscus } from "@/app/components/Comment"
import GoBack from "@/app/components/GoBack"
import PostDetail from "@/app/components/PostDetail"
import SharedElement from "@/app/components/SharedElement"
import { getPostList, getSinglePostInfo } from "@/lib/notion"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { slug: string } }) {
	const page = await getSinglePostInfo(params.slug, true)
	if (!page) notFound()
	return (
		<>
			<SharedElement layoutId={`post-cover-${page.id}`}>
				<Image
					className="h-auto w-full rounded-lg"
					src={page.cover.url}
					alt="post cover"
					width={page.cover.width}
					height={page.cover.height}
				/>
			</SharedElement>
			<h1 className="my-6 self-start text-4xl">{page.title}</h1>
			{/* @ts-expect-error Server Component */}
			<PostDetail slug={params.slug} />
			<GoBack className="self-start" />
			<Giscus />
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
