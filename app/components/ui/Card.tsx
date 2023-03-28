"use client"

import { motion } from "framer-motion"

export default function Card({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	return (
		<motion.article
			className={className}
			whileHover={{ scale: 1.03 }}
			{...{ children }}
		></motion.article>
	)
}
