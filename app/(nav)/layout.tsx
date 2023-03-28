import Header from "@/app/components/part/Header"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<div className="relative my-8 flex w-full flex-col gap-4">{children}</div>
		</>
	)
}
