"use client"

import { cn } from "@/lib/utils"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { motion } from "framer-motion"
import type { Route } from "next"
import NextLink from "next/link"
import { usePathname } from "next/navigation"

const navList = [
	{ name: "主页", href: "/" },
	{ name: "文章", href: "/post" },
	{ name: "订阅列表", href: "/feedlist" },
] as const

function NavItem({
	href,
	name,
	onNavIitemClick,
}: {
	href: Route
	name: string
	onNavIitemClick?: () => void
}) {
	const pathname = usePathname()
	const isActive = pathname === href

	return (
		// https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing
		<NavigationMenu.Item>
			<NextLink href={href} passHref legacyBehavior>
				<NavigationMenu.Link active={isActive} onClick={onNavIitemClick}>
					<span className="relative py-[5px] px-[10px]">
						{name}
						{isActive && (
							<motion.div
								layoutId="nav-active-indicator"
								className="!hidden sm:!block absolute -z-10 inset-0 rounded-md bg-neutral-100 dark:bg-neutral-800"
								transition={{
									type: "spring",
									stiffness: 350,
									damping: 30,
								}}
							/>
						)}
					</span>
				</NavigationMenu.Link>
			</NextLink>
		</NavigationMenu.Item>
	)
}

export interface NavProps {
	children?: React.ReactNode
	className?: string
	onNavIitemClick?: () => void
}

export default function Nav(props: NavProps) {
	const { children, className = "", onNavIitemClick } = props
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
					<NavItem key={tab.name} onNavIitemClick={onNavIitemClick} {...tab} />
				))}
			</NavigationMenu.List>
		</NavigationMenu.Root>
	)
}
