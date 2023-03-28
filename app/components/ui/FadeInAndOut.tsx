"use client"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

// Exit animation is not working
// https://github.com/framer/motion/issues/1375
export default function FadeInAndOut({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	const pathname = usePathname()
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={pathname}
				className={className}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 10 }}
				transition={{ duration: 0.3 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
