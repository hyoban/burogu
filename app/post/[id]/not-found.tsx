import GoBack from "@/app/components/ui/GoBack"

export default function NotFound() {
	return (
		<div className="flex w-full flex-col items-center">
			<h2 className="text-center font-mono text-2xl">post not found</h2>
			<GoBack />
		</div>
	)
}
