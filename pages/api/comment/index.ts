import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { z } from "zod"

const prisma = new PrismaClient()

const commentSchema = z.object({
	comment: z.string().min(1).max(1000),
	slug: z.string(),
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const data = await req.body
		const session = await getServerSession(req, res, authOptions)

		if (!session) {
			res.status(401).end()
			return
		}

		if (!session.user?.name || !session.user?.email) {
			res.status(401).end()
			return
		}

		try {
			const comment = commentSchema.parse(data)
			try {
				await prisma.comment.create({
					data: {
						comment: comment.comment,
						slug: comment.slug,
						name: session.user.name,
						email: session.user.email,
						image: session.user.image,
					},
				})
			} catch {
				res.status(400).json({
					error: "无法创建评论",
				})
			}
			res.status(200).json({
				message: "评论成功",
			})
		} catch {
			res.status(400).json({
				error: "无效的评论",
			})
		}
	} else {
		res.status(405).end()
	}
}
