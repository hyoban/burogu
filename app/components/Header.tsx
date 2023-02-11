import Image from 'next/image'

import Nav from '@/app/components/Nav'
import config from '@/site.config.cjs'
import Link from 'next/link'

export default function Header({}) {
  return (
    <header className="flex w-full items-center justify-between gap-6">
      <div className="flex items-center space-x-4">
        <Link href="/" className="hover:opacity-100">
          <Image
            className="h-16 w-16 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
            src={config.avatarPath}
            alt=""
            width={64}
            height={64}
          />
        </Link>
        <div className=" hidden font-medium dark:text-white sm:block">
          <div className="mb-1 text-xl">{config.authorName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {config.shortDescription}
          </div>
        </div>
      </div>
      <Nav />
    </header>
  )
}
