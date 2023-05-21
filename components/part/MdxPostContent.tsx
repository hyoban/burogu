import { CodeBlock } from "@/components/part/NotionPostContent"
import Prose from "@/components/ui/Prose"
import { LocalPost } from "@/types/post"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
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
					className="mr-px border-b border-neutral-300 pb-px no-underline transition-colors hover:border-neutral-600 dark:border-neutral-600 dark:hover:border-neutral-300"
				>
					{props.children}
				</a>
				<sup>↗</sup>
			</>
		)
	},
	pre: (props) => {
		return (
			/* @ts-expect-error Server Component */
			<CodeBlock
				block={{
					code: {
						/* @ts-expect-error render code */
						rich_text: props.children.props.children,
						language:
							/* @ts-expect-error render code */
							props.children.props.className?.replace("language-", "") || "",
					},
				}}
			/>
		)
	},
	code: (props) => {
		return (
			<code
				{...props}
				className="not-prose rounded border border-neutral-200 bg-neutral-100 px-[4px] py-[2px] font-normal opacity-80 before:content-none after:content-none dark:border-neutral-700 dark:bg-neutral-800"
			></code>
		)
	},
}

export default function MdxPostContent({ content, metadata }: LocalPost) {
	return (
		<Prose>
			<h1>{metadata.title}</h1>
			{/* @ts-expect-error Server Component */}
			<MDXRemote source={content} components={components} />
		</Prose>
	)
}
