import { cn } from "@/lib/utils"

// https://beta.nextjs.org/docs/routing/loading-ui
// https://beta.nextjs.org/docs/api-reference/file-conventions/loading
export default function Loading() {
	const repeat = 3
	return (
		<>
			{Array(repeat)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className={cn(
							"overflow-clip rounded-lg border dark:border-gray-600 animate-pulse flex w-full flex-col gap-4",
							i === 1 ? "delay-500" : i === 2 ? "delay-1000" : ""
						)}
					>
						<div className="h-36 w-full bg-slate-200 dark:bg-gray-700"></div>
						<p className="mx-4 rounded-md w-10 h-5 bg-slate-200 dark:bg-gray-700"></p>
						<p className="mx-4 mb-4 rounded-md w-[calc(100%-2rem)] h-5 bg-slate-200 dark:bg-gray-700"></p>
					</div>
				))}
		</>
	)
}
