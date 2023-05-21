import { getOGImage, sharedMetadata, size } from "@/app/shared-metadata"
import MdxPostContent from "@/components/part/MdxPostContent"
import NotionPostContent from "@/components/part/NotionPostContent"
import GoBack from "@/components/ui/GoBack"
import SITE_CONFIG from "@/config/site.config"
import { getMetadataList, getPost, getPostMetadata } from "@/lib/post"
import { Metadata as NextMetadata } from "next"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function Page({ params }: { params: { id: string } }) {
	const post = await getPost(params.id)
	if (!post) notFound()

	if (Array.isArray(post.content)) {
		return (
			<>
				{/* @ts-expect-error Server Component */}
				<NotionPostContent id={params.id} title={post.metadata.title} />
				<GoBack className="mt-4" />
			</>
		)
	}

	return (
		<>
			<MdxPostContent content={post.content} metadata={post.metadata} />
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
}): Promise<NextMetadata> {
	const metadata = await getPostMetadata(params.id)
	const image = getOGImage(
		SITE_CONFIG.siteUrl.replace("https://", ""),
		metadata?.title || ""
	)

	return {
		title: metadata?.title,
		description: metadata?.description,
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
