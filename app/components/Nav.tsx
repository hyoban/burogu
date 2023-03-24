"use client"

import { cn } from "@/lib/utils"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { motion } from "framer-motion"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

export default function Nav({
	children,
	className = "",
	onNavIitemClick,
}: {
	children?: React.ReactNode
	className?: string
	onNavIitemClick?: () => void
}) {
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
			className={cn(
				"h-full sm:h-auto w-full sm:w-auto flex flex-col sm:flex-row sm:gap-4 items-center justify-center",
				className
			)}
		>
			{children}
			<NavigationMenu.List className="flex flex-col sm:flex-row gap-5 sm:gap-0 h-full pt-10 sm:py-1 items-center justify-start">
				{navList.map((tab) => (
					// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing
					<NavigationMenu.Item key={tab.name}>
						<NextLink href={tab.href} passHref legacyBehavior>
							<NavigationMenu.Link
								active={tab.active}
								className="px-3"
								onClick={onNavIitemClick}
							>
								{tab.name}
							</NavigationMenu.Link>
						</NextLink>
					</NavigationMenu.Item>
				))}
				<motion.div
					className="!hidden sm:!block absolute -z-10 h-full rounded-md bg-[#f5f5f5] dark:bg-[#262626]"
					animate={{
						width: activeNav?.width,
						x: activeNav?.x,
					}}
				/>
			</NavigationMenu.List>
		</NavigationMenu.Root>
	)
}
