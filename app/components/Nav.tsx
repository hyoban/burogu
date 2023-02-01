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
    <nav className="flex w-fit">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={classNames(
            tab.current ? 'bg-[#f5f5f5] dark:bg-[#262626]' : '',
            'rounded-md px-3 py-1 text-sm no-underline hover:opacity-100',
          )}>
          {tab.name}
        </Link>
      ))}
    </nav>
  )
}
