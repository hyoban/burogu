import { SignInButton } from "@/app/components/part/AuthButton"
import CommentForm from "@/app/components/part/CommentForm"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient()

export default async function Comment({ slug }: { slug: string }) {
	const fetchSession = getServerSession(authOptions)
	const fetchComments = prisma.comment.findMany({
		where: {
			slug,
		},
		orderBy: {
			createdAt: "desc",
		},
	})

	const [session, comments] = await Promise.all([fetchSession, fetchComments])

	return (
		<>
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
