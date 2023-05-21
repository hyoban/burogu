import { cn } from "@/lib/utils"

const Prose = (props: BasicProps) => {
	const { children, className } = props

	return (
		<article
			className={cn(
				"flex flex-col gap-4 relative",
				"prose prose-neutral dark:prose-invert",
				"prose-h1:my-4 prose-h2:my-2 prose-h3:my-0 prose-h4:my-0 prose-h5:my-0 prose-h6:my-0",
				"prose-ul:my-0 prose-ol:my-0 prose-p:my-0",
				className
			)}
		>
			{children}
		</article>
	)
}

export default Prose
