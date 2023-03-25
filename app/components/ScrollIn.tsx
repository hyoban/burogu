"use client"

import { motion } from "framer-motion"

export default function ScrollIn({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, x: 10 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
		>
			{children}
		</motion.div>
	)
}
