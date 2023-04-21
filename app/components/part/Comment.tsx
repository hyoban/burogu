"use client"

import { CommentList } from "@/app/api/comment/[slug]/route"
import { SignInButton } from "@/app/components/part/AuthButton"
import CommentForm from "@/app/components/part/CommentForm"
import MarkdownWrapper from "@/app/components/ui/MarkdownWrapper"
import { useSession } from "next-auth/react"
import { Fragment } from "react"
import useSWR from "swr"

async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init)
	return res.json()
}

export default function Comment({ slug }: { slug: string }) {
	const sessionStatus = useSession()
	const { data: comments } = useSWR<CommentList>(
		`/api/comment/${slug}`,
		fetcher
	)

	return (
		<MarkdownWrapper>
			<h2>评论</h2>
			{comments && comments?.length > 0 ? (
				<p>
					{comments.map((comment) => (
						<Fragment key={comment.id}>
							<span className="text-neutral-500 dark:text-neutral-400 mr-3">
								{comment.name + ":"}
							</span>
							<span>{comment.comment}</span>
						</Fragment>
					))}
				</p>
			) : (
				<p>还没有评论呢</p>
			)}
			{sessionStatus?.data?.user ? <CommentForm /> : <SignInButton />}
		</MarkdownWrapper>
	)
}
