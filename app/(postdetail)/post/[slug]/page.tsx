import Comment from "@/app/components/part/Comment"
import PostContent from "@/app/components/part/PostContent"
import TOC from "@/app/components/part/TOC"
import SharedElement from "@/app/components/ui/SharedElement"
import {
	getPostList,
	getSinglePostContent,
	getSinglePostInfo,
	getTOCFromBlocks,
} from "@/lib/notion"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { slug: string } }) {
	const fetchPage = getSinglePostInfo(params.slug, true)
	const fetchBlocks = getSinglePostContent(params.slug, true)

	const [page, blocks] = await Promise.all([fetchPage, fetchBlocks])
	if (!page || !blocks) notFound()
	const toc = getTOCFromBlocks(blocks)

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
			<PostContent blocks={blocks} />
			<Comment slug={params.slug} />
			<TOC toc={toc} className="hidden xl:block" />
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
