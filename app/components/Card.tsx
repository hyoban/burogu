"use client";

import { motion } from "framer-motion";

export default function Card({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			className={className}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
			{...{ children }}
		></motion.div>
	);
}
