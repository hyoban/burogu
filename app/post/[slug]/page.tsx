import PostContent from "@/app/components/part/PostContent"
import { getPostList, getSinglePostInfo } from "@/lib/notion"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export default async function Page({ params }: { params: { slug: string } }) {
	const page = await getSinglePostInfo(params.slug)

	if (!page) notFound()

	return (
		<>
			<h1 className="my-8 text-4xl">{page.title}</h1>
			<Suspense
				fallback={
					<div className="flex flex-col gap-4 my-4 animate-pulse">
						<p className="rounded-md w-96 h-8 bg-neutral-200 dark:bg-neutral-700"></p>
						<p className="rounded-md w-full h-12 bg-neutral-200 dark:bg-neutral-700"></p>
					</div>
				}
			>
				<PostContent id={params.slug} />
			</Suspense>
		</>
	)
}

export async function generateStaticParams() {
	const posts = await getPostList()
	if (!posts) return []

	return posts.map((post) => ({
		slug: post.id,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const page = await getSinglePostInfo(params.slug)

	return { title: page?.title }
}
