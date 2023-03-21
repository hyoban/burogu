"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
	const pathname = usePathname();

	const navList = (
		[
			{ name: "文章", href: "/", width: 56, x: 0 },
			{ name: "订阅列表", href: "/feedlist", width: 88, x: 56 },
		] as const
	).map((tab) => ({
		...tab,
		active: tab.href === pathname,
	}));

	const activeNav = navList.find((tab) => tab.active);

	return (
		<NavigationMenu.Root
			className="relative flex w-fit py-1 items-center"
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
	);
};

export default Nav;
