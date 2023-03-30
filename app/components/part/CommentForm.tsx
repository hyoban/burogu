"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export default function CommentForm({ className }: { className?: string }) {
	const router = useRouter()
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition()
	const [isFetching, setIsFetching] = useState(false)
	const isMutating = isFetching || isPending

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsFetching(true)

		const form = e.currentTarget
		const input = form.elements.namedItem("entry") as HTMLInputElement

		const res = await fetch("/api/comment", {
			body: JSON.stringify({
				comment: input.value,
				slug: pathname?.split("/").pop() ?? "",
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		})

		input.value = ""

		setIsFetching(false)
		startTransition(() => {
			// Refresh the current route and fetch new data from the server without
			// losing client-side browser or React state.
			router.refresh()
		})
	}

	return (
		<form
			style={{ opacity: !isMutating ? 1 : 0.7 }}
			className={cn("relative max-w-[500px] text-sm", className)}
			onSubmit={onSubmit}
		>
			<input
				aria-label="你的评论"
				placeholder="你的评论"
				disabled={isPending}
				name="entry"
				type="text"
				required
				className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
			/>
			<button
				className="flex items-center justify-center absolute right-1 top-2 px-2 py-1 font-medium h-7 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded w-16"
				disabled={isMutating}
				type="submit"
			>
				提交
			</button>
		</form>
	)
}
