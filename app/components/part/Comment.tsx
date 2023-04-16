"use client"

import { CommentList } from "@/app/api/comment/[slug]/route"
import { SignInButton } from "@/app/components/part/AuthButton"
import CommentForm from "@/app/components/part/CommentForm"
import { useSession } from "next-auth/react"
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
		<>
			<h2 className="my-2 self-start text-3xl">评论</h2>
			{comments && comments?.length > 0 ? (
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
			) : (
				<div className="self-start">还没有评论呢</div>
			)}
			{sessionStatus?.data?.user && (
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
			{!sessionStatus?.data?.user && <SignInButton className="self-start" />}
		</>
	)
}
