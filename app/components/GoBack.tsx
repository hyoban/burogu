"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function GoBack({ className }: { className?: string }) {
	const router = useRouter()
	const goBack = () => {
		// check if there is a previous page
		if (window.history.length > 2) {
			router.back()
		} else {
			router.replace("/")
		}
	}

	return (
		<div
			className={cn("flex items-center gap-2 opacity-70 font-mono", className)}
		>
			<span>{">"}</span>
			<button
				className="underline decoration-dashed decoration-1 underline-offset-4 hover:opacity-50"
				onClick={goBack}
			>
				{"cd .."}
			</button>
		</div>
	)
}
