"use client"

import { InfiniteLoading } from "@/app/components/ui/Loading"

export default function Loading() {
	return (
		<>
			<h2 className="text-2xl font-mono text-center">loading...</h2>
			<InfiniteLoading className="max-w-[60%]" />
		</>
	)
}
