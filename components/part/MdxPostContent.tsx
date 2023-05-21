"use client"

import Prose from "@/components/ui/Prose"
import { LocalPost } from "@/types/post"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote"
import Link from "next/link"

const components: MDXRemoteProps["components"] = {
	a: (props) => {
		if (props.href && !props.href.startsWith("http")) {
			return <Link href={props.href}>{props.children}</Link>
		}
		return (
			<>
				<a
					{...props}
					target="_blank"
					rel="noopener noreferrer"
					className="mr-px"
				>
					{props.children}
				</a>
				<sup>↗</sup>
			</>
		)
	},
}

export default function MdxPostContent({ content, metadata }: LocalPost) {
	return (
		<Prose>
			<h1>{metadata.title}</h1>
			<MDXRemote {...content} components={components} />
		</Prose>
	)
}
