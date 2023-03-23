"use client"

import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { motion } from "framer-motion"
import NextLink from "next/link"
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
		<NavigationMenu.Root className={className}>
			<NavigationMenu.List className="flex py-1 items-center">
				{navList.map((tab) => (
					// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing
					<NavigationMenu.Item key={tab.name}>
						<NextLink href={tab.href} passHref legacyBehavior>
							<NavigationMenu.Link active={tab.active} className="px-3">
								{tab.name}
							</NavigationMenu.Link>
						</NextLink>
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
