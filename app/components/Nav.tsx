"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const tabs = [
    { name: "文章", href: "/", width: 56, x: 0 },
    { name: "订阅列表", href: "/feedlist", width: 88, x: 56 },
  ].map((tab) => ({
    ...tab,
    current: tab.href === pathname,
  }));

  const currentTab = tabs.find((tab) => tab.current);

  return (
    <nav className="relative flex w-fit">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className="px-3 py-1 no-underline hover:opacity-100"
        >
          {tab.name}
        </Link>
      ))}
      <motion.div
        className="absolute -z-10 h-full rounded-md bg-[#f5f5f5] dark:bg-[#262626]"
        animate={{
          width: currentTab?.width,
          x: currentTab?.x,
        }}
      />
    </nav>
  );
}
