"use client"

import Prose from "@/components/ui/Prose"
import { LocalPost } from "@/types/post"
import { MDXRemote } from "next-mdx-remote"

export function MdxContent({ content, metadata }: LocalPost) {
	return (
		<Prose>
			<h1>{metadata.title}</h1>
			<MDXRemote {...content} />
		</Prose>
	)
}
