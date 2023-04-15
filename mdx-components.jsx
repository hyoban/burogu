import { H2Block, H3Block, PBlock } from "@/app/components/part/PostContent.tsx"

export function useMDXComponents(components) {
	return {
		h2: H2Block,
		h3: H3Block,
		p: PBlock,
		li: ({ children }) => <li className="my-2">{children}</li>,
		a: ({ children, href }) => (
			<a href={href} target="_blank" rel="noopener noreferrer">
				{children}
			</a>
		),
		...components,
	}
}
