"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function GoBack({ className }: BasicProps) {
	const router = useRouter()

	const goBack = () => {
		if (window.history.length > 2) {
			router.back()
		} else {
			router.replace("/")
		}
	}

	return (
		<div
			className={cn(
				"flex items-center gap-2 font-mono text-neutral-500 dark:text-neutral-400",
				className
			)}
		>
			<span>{">"}</span>
			<button
				className="underline decoration-dashed decoration-1 underline-offset-4 hover:decoration-solid"
				onClick={goBack}
			>
				{"cd .."}
			</button>
		</div>
	)
}
