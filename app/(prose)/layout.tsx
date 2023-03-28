import Header from "@/app/components/part/Header"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<div className="my-8 flex w-full flex-col gap-3 prose">{children}</div>
		</>
	)
}
