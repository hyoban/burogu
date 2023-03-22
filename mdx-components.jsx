import { H1Block, H2Block, PBlock } from "@/app/components/PostContent.tsx"

export function useMDXComponents(components) {
	return {
		h2: H1Block,
		h3: H2Block,
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
