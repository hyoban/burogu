import Post from "@/app/components/part/Post"
import { getPostList, getSinglePostInfo } from "@/lib/notion"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function Page({ params }: { params: { slug: string } }) {
	const page = await getSinglePostInfo(params.slug)
	if (!page) notFound()

	return <Post id={params.slug} title={page.title} />
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
