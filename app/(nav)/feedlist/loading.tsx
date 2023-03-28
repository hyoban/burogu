import { cn } from "@/lib/utils"

// https://beta.nextjs.org/docs/routing/loading-ui
// https://beta.nextjs.org/docs/api-reference/file-conventions/loading
export default function Loading() {
	return (
		<>
			{Array(3)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className={cn(
							"animate-pulse w-full my-3",
							i === 1 ? "delay-500" : i === 2 ? "delay-1000" : ""
						)}
					>
						<h1 className="mx-4 rounded-md w-20 h-8 bg-slate-200 dark:bg-slate-700"></h1>
						{Array(4)
							.fill(0)
							.map((_, i) => (
								<p
									key={i}
									className="mx-4 my-3 rounded-md w-[calc(100%-2rem)] h-5 bg-slate-200 dark:bg-slate-700"
								></p>
							))}
					</div>
				))}
		</>
	)
}
