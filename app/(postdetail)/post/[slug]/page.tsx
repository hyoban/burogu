import { SignInButton } from "@/app/components/part/AuthButton"
import CommentForm from "@/app/components/part/CommentForm"
import PostContent from "@/app/components/part/PostContent"
import TOC from "@/app/components/part/TOC"
import SharedElement from "@/app/components/ui/SharedElement"
import {
	getPostList,
	getSinglePostContent,
	getSinglePostInfo,
	getTOCFromBlocks,
} from "@/lib/notion"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import Image from "next/image"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

export default async function Page({ params }: { params: { slug: string } }) {
	const fetchPage = getSinglePostInfo(params.slug, true)
	const fetchBlocks = getSinglePostContent(params.slug, true)
	const fetchSession = getServerSession(authOptions)
	const fetchComments = prisma.comment.findMany({
		where: {
			slug: params.slug,
		},
		orderBy: {
			createdAt: "desc",
		},
	})
	const [page, blocks, session, comments] = await Promise.all([
		fetchPage,
		fetchBlocks,
		fetchSession,
		fetchComments,
	])
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
			<TOC toc={toc} className="hidden xl:block" />
			<h2 className="my-2 self-start text-3xl">评论</h2>
			<div className="self-start">
				{comments.map((comment) => (
					<div key={comment.id} className=" my-2">
						<span className="text-neutral-600 dark:text-neutral-400 mr-1">
							{comment.name + ":"}
						</span>
						<span>{comment.comment}</span>
					</div>
				))}
			</div>
			{session?.user && (
				<>
					<CommentForm className="self-start" />
					{/* <div className="flex gap-2 items-center self-start">
						{session.user.image && (
							<Image
								src={session.user.image}
								width={40}
								height={40}
								className="rounded-full"
								alt="avatar of user"
							/>
						)}
						<span>{session.user.name}</span>
						<SignOutButton />
					</div> */}
				</>
			)}
			{!session?.user && <SignInButton className="self-start" />}
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
