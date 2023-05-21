import { getOGImage, sharedMetadata, size } from "@/app/shared-metadata"
import NotionPostContent from "@/components/part/NotionPostContent"
import GoBack from "@/components/ui/GoBack"
import { MdxContent } from "@/components/ui/MdxContent"
import SITE_CONFIG from "@/config/site.config"
import { getMetadataList, getPost, getPostMetadata } from "@/lib/post"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function Page({ params }: { params: { id: string } }) {
	const page = await getPost(params.id)
	if (!page) notFound()

	if (Array.isArray(page.content)) {
		return (
			<>
				{/* @ts-expect-error Server Component */}
				<NotionPostContent id={params.id} title={page.metadata.title} />
				<GoBack className="mt-4" />
			</>
		)
	}

	return (
		<>
			<MdxContent source={page.content} />
			<GoBack className="mt-4" />
		</>
	)
}

export async function generateStaticParams() {
	const posts = await getMetadataList()
	if (!posts) return []

	return posts.map((post) => ({
		id: post.permalink,
	}))
}

export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const page = await getPostMetadata(params.id)
	const image = getOGImage(
		SITE_CONFIG.siteUrl.replace("https://", ""),
		page?.title || ""
	)

	return {
		title: page?.title,
		openGraph: {
			...sharedMetadata.openGraph,
			images: [
				{
					...size,
					url: image,
				},
			],
		},
	}
}
