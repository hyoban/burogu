import { cn } from "@/lib/utils"
import SITE_CONFIG from "@/site.config"
import Image from "next/image"
import Link from "next/link"

export default function Avatar({ className = "" }: { className?: string }) {
	return (
		<Link href="/">
			<Image
				className={cn("rounded-full", className)}
				src={SITE_CONFIG.avatarPath}
				alt={SITE_CONFIG.authorName}
				priority={true}
				width={64}
				height={64}
			/>
		</Link>
	)
}
