"use client"

import { Dialog, DialogContent } from "@/app/components/ui/Dialog"
import { useRouter } from "next/navigation"

export default function PostPreview({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()

	return (
		<Dialog
			defaultOpen
			onOpenChange={(open) => {
				if (!open) {
					router.back()
				}
			}}
		>
			<DialogContent
				withoutCloseButton
				icon={
					<button
						onClick={() => {
							window.location.reload()
						}}
						className="i-carbon-maximize"
					></button>
				}
			>
				{children}
			</DialogContent>
		</Dialog>
	)
}
