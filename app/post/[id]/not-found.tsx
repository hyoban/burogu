import GoBack from "@/app/components/ui/GoBack"

export default function NotFound() {
	return (
		<div className="flex flex-col items-center w-full">
			<h2 className="text-2xl font-mono text-center">post not found</h2>
			<GoBack />
		</div>
	)
}
