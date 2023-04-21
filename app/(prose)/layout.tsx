import MarkdownWrapper from "@/app/components/ui/MarkdownWrapper"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<MarkdownWrapper>{children}</MarkdownWrapper>
		</>
	)
}
