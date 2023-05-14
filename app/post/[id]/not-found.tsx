import GoBack from "@/app/components/ui/GoBack"

export default function NotFound() {
	return (
		<div className="flex flex-col gap-4">
			<h2 className="font-mono text-lg">post not found</h2>
			<GoBack />
		</div>
	)
}
