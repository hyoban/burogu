"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

export default function SharedElement({
	layoutId,
	children,
	className,
}: React.PropsWithChildren<{
	layoutId: string
	className?: string
}>) {
	return (
		<motion.div layoutId={layoutId} className={cn("relative z-50", className)}>
			{children}
		</motion.div>
	)
}
