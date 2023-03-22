"use client"

import config from "@/site.config.cjs"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const Avatar = () => {
	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			<Link href="/" className="hover:opacity-100">
				<Image
					className="h-16 w-16 rounded-full"
					src={config.avatarPath}
					alt={config.authorName}
					width={64}
					height={64}
				/>
			</Link>
		</motion.button>
	)
}

export default Avatar
