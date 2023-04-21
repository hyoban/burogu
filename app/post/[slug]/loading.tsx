"use client"

import { InfiniteLoading } from "@/app/components/ui/Loading"

export default function Loading() {
	return (
		<div className="flex flex-col items-center w-full">
			<h2 className="text-2xl font-mono text-center">loading...</h2>
			<InfiniteLoading className="max-w-[60%]" />
		</div>
	)
}
