"use client"

import Nav from "@/app/components/part/Nav"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/Sheet"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function NavTrigger({
	className,
	children,
}: {
	className?: string
	children?: React.ReactNode
}) {
	const [isNavOpen, setIsNavOpen] = useState(false)

	return (
		<Sheet open={isNavOpen} onOpenChange={(v) => setIsNavOpen(v)}>
			<SheetTrigger asChild>
				<button
					className={cn(
						"absolute top-0 left-0 i-carbon-list text-2xl mt-4 ml-4",
						className
					)}
				></button>
			</SheetTrigger>
			<SheetContent position="left" size="lg">
				<Nav onNavIitemClick={() => setIsNavOpen(false)}>{children}</Nav>
			</SheetContent>
		</Sheet>
	)
}
