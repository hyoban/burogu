export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto flex w-full flex-col items-center gap-4">
			{children}
		</div>
	)
}
