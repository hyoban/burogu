import Header from "@/app/components/part/Header"
import MarkdownWrapper from "@/app/components/ui/MarkdownWrapper"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<MarkdownWrapper>{children}</MarkdownWrapper>
		</>
	)
}
