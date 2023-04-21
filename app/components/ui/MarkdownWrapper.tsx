import { cn } from "@/lib/utils"

export default function MarkdownWrapper({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	return (
		<article
			className={cn(
				"flex flex-col gap-4 relative",
				"markdown markdown-neutral dark:markdown-invert",
				"markdown-h1:my-0 markdown-h2:my-0 markdown-h3:my-0 markdown-h4:my-0 markdown-h5:my-0 markdown-h6:my-0",
				"markdown-ul:my-0 markdown-ol:my-0 markdown-p:my-0",
				className
			)}
		>
			{children}
		</article>
	)
}
