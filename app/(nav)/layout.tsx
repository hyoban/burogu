import Header from "@/app/components/Header"

export default function NavLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
		</>
	)
}
