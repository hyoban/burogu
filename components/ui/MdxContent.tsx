"use client"

import Prose from "@/components/ui/Prose"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"

type MdxContentProps = {
	source: MDXRemoteSerializeResult
}

export function MdxContent({ source }: MdxContentProps) {
	return (
		<Prose>
			<MDXRemote {...source} />
		</Prose>
	)
}
