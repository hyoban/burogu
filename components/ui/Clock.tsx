"use client"

import useNow from "@/hooks/useNow"
import * as Tooltip from "@radix-ui/react-tooltip"

const Clock = () => {
	const { now, hour, minute, second } = useNow()

	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<svg viewBox="0 0 100 100" className="h-6 w-6">
						<circle
							cx="50"
							cy="50"
							r="40"
							stroke="currentColor"
							strokeWidth="5"
							fill="transparent"
						/>

						<line
							x1="50"
							y1="50"
							x2="50"
							y2="35"
							stroke="currentColor"
							strokeWidth="5"
							strokeLinecap="round"
							transform={`rotate(${hour * 30 + minute * 0.5} 50 50)`}
							/* @ts-expect-error ignore */
							suppressHydrationWarning
						/>

						<line
							x1="50"
							y1="50"
							x2="50"
							y2="28"
							stroke="currentColor"
							strokeWidth="5"
							strokeLinecap="round"
							transform={`rotate(${minute * 6 + second * 0.1} 50 50)`}
							/* @ts-expect-error ignore */
							suppressHydrationWarning
						/>

						<line
							x1="50"
							y1="50"
							x2="50"
							y2="20"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							transform={`rotate(${second * 6} 50 50)`}
							opacity={0.8}
							/* @ts-expect-error ignore */
							suppressHydrationWarning
						/>
					</svg>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						side="bottom"
						sideOffset={5}
						className="z-50 overflow-hidden rounded-md border border-neutral-200 px-3 py-1.5 text-sm shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 dark:border-neutral-800"
					>
						{now.format("z YYYY-MM-DD ddd HH:mm:ss")}
						<Tooltip.Arrow className="fill-white dark:fill-slate-900" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	)
}

export default Clock
