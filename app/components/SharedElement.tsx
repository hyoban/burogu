"use client"

import { motion } from "framer-motion"
import React from "react"

export default function SharedElement({
	layoutId,
	children,
}: React.PropsWithChildren<{
	layoutId: string
}>) {
	return <motion.div layoutId={layoutId}>{children}</motion.div>
}
