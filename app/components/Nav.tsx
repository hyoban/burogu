"use client"

import { cn } from "@/lib/utils"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Nav({ className = "" }: { className?: string }) {
	const pathname = usePathname()

	const navList = (
		[
			{ name: "主页", href: "/", width: 56, x: 0 },
			{ name: "文章", href: "/post", width: 56, x: 56 },
			{ name: "订阅列表", href: "/feedlist", width: 88, x: 112 },
		] as const
	).map((tab) => ({
		...tab,
		active: tab.href === pathname,
	}))

	const activeNav = navList.find((tab) => tab.active)

	return (
		<NavigationMenu.Root
			className={cn("relative flex w-fit py-1 items-center", className)}
			asChild
		>
			<NavigationMenu.List>
				{navList.map((tab) => (
					<NavigationMenu.Item key={tab.name} className="list-none">
						<Link href={tab.href} passHref legacyBehavior>
							<NavigationMenu.Link
								active={tab.active}
								className="px-3 no-underline hover:opacity-100"
							>
								{tab.name}
							</NavigationMenu.Link>
						</Link>
					</NavigationMenu.Item>
				))}
				<motion.div
					className="absolute -z-10 h-full rounded-md bg-[#f5f5f5] dark:bg-[#262626]"
					animate={{
						width: activeNav?.width,
						x: activeNav?.x,
					}}
				/>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	)
}
