export default function MarkdownWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<article className="my-8 flex flex-col gap-4 relative markdown markdown-neutral dark:markdown-invert markdown-h1:my-0 markdown-h2:my-0 markdown-h3:my-0 markdown-h4:my-0 markdown-h5:my-0 markdown-h6:my-0 markdown-ul:my-0 markdown-ol:my-0 markdown-p:my-0">
			{children}
		</article>
	)
}
