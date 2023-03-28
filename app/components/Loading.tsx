"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import * as React from "react"

import { cn } from "@/lib/utils"

const InfiniteLoading = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			"relative h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-neutral-800",
			className
		)}
		{...props}
	>
		<ProgressPrimitive.Indicator className="h-full w-full flex-1 bg-slate-900 dark:bg-slate-400 animate-in duration-1000 slide-in-from-left" />
	</ProgressPrimitive.Root>
))
InfiniteLoading.displayName = ProgressPrimitive.Root.displayName

export { InfiniteLoading }
