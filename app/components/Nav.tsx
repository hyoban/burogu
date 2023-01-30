'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const pathname = usePathname()

  const tabs = [
    { name: 'Me', href: '/' },
    { name: 'Posts', href: '/post' },
    { name: 'Feed List', href: '/feedlist' },
  ].map((tab) => ({
    ...tab,
    current: tab.href === pathname,
  }))

  return (
    <nav className="flex w-fit space-x-4 rounded-md bg-[#f1f5f9] p-1 dark:bg-[#1e293b]">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={classNames(
            tab.current ? 'bg-white dark:bg-[#0f172a]' : '',
            'rounded-md px-3 py-1 text-sm no-underline hover:opacity-100',
          )}
          aria-current={tab.current ? 'page' : undefined}>
          {tab.name}
        </Link>
      ))}
    </nav>
  )
}
