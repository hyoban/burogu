import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export type CommentList = Awaited<ReturnType<typeof getCommentsBySlug>>

function getCommentsBySlug(slug: string) {
	return prisma.comment.findMany({
		where: {
			slug,
		},
		orderBy: {
			createdAt: "desc",
		},
	})
}

// https://beta.nextjs.org/docs/routing/route-handlers
export async function GET(
	_request: Request,
	{
		params,
	}: {
		params: {
			slug: string
		}
	}
) {
	const comments = await getCommentsBySlug(params.slug)
	return NextResponse.json(comments)
}
