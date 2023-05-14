import Post from "@/app/components/part/Post"
import GoBack from "@/app/components/ui/GoBack"
import { getOGImage, sharedMetadata } from "@/app/shared-metadata"
import { getPostList, getSinglePostInfo } from "@/lib/notion"
import SITE_CONFIG from "@/site.config"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function Page({ params }: { params: { id: string } }) {
	const page = await getSinglePostInfo(params.id)
	if (!page) notFound()

	return (
		<>
			<Post id={params.id} title={page.title} />
			<GoBack className="mt-4" />
		</>
	)
}

export async function generateStaticParams() {
	const posts = await getPostList()
	if (!posts) return []

	return posts.map((post) => ({
		id: post.id,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const page = await getSinglePostInfo(params.id)
	const image = getOGImage(SITE_CONFIG.siteName, page?.title || "")

	return {
		title: page?.title,
		twitter: {
			...sharedMetadata.twitter,
			images: [
				{
					url: image,
				},
			],
		},
		openGraph: {
			...sharedMetadata.openGraph,
			images: [
				{
					url: image,
				},
			],
		},
	}
}
