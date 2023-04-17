import { TOCItem } from "@/lib/notion"
import { cn } from "@/lib/utils"

export interface TOCProps {
	toc: TOCItem[]
	className?: string
}

function TOCInner(props: TOCProps) {
	const { toc } = props

	return (
		<ol>
			{toc.map((item, i) => (
				<li key={i} className="space-y-2">
					<a href={`#${encodeURIComponent(item.title)}`}>{item.title}</a>
					{item.children && <TOCInner toc={item.children} />}
				</li>
			))}
		</ol>
	)
}

export default function TOC(props: TOCProps) {
	const { toc, className } = props

	return (
		<div
			className={cn(
				"text-sm w-[250px] prose fixed top-1/2 -translate-y-1/2 right-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 opacity-0 hover:opacity-80 transition-opacity duration-200",
				className
			)}
		>
			<TOCInner toc={toc} />
		</div>
	)
}
