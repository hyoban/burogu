"use client"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useSWRConfig } from "swr"

export default function CommentForm({ className }: { className?: string }) {
	const { mutate } = useSWRConfig()

	const pathname = usePathname()
	const slug = pathname?.split("/").pop() ?? ""

	const [isFetching, setIsFetching] = useState(false)

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsFetching(true)

		const form = e.currentTarget
		const input = form.elements.namedItem("entry") as HTMLInputElement

		await fetch("/api/comment", {
			body: JSON.stringify({
				comment: input.value,
				slug,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		})

		input.value = ""

		setIsFetching(false)
		mutate(`/api/comment/${slug}`)
	}

	return (
		<form
			style={{ opacity: !isFetching ? 1 : 0.7 }}
			className={cn("relative max-w-[500px] text-sm", className)}
			onSubmit={onSubmit}
		>
			<input
				aria-label="你的评论"
				placeholder="你的评论"
				disabled={isFetching}
				name="entry"
				type="text"
				required
				className="pl-4 pr-32 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full border-neutral-300 rounded-md bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
			/>
			<button
				className="flex items-center justify-center absolute right-1 top-2 px-2 py-1 font-medium h-7 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded w-16"
				disabled={isFetching}
				type="submit"
			>
				提交
			</button>
		</form>
	)
}
