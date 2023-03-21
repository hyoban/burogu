"use client"

import config from "@/site.config.cjs"
import { motion } from "framer-motion"
import Image from "next/image"

const Avatar = () => {
	return (
		<motion.a
			href={config.authorLink}
			target="_blank"
			rel="noopener noreferrer"
			className="hover:opacity-100"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			<Image
				className="h-16 w-16 rounded-full"
				src={config.avatarPath}
				alt={config.authorName}
				width={64}
				height={64}
			/>
		</motion.a>
	)
}

export default Avatar
