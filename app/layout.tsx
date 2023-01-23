import ApperanceSwitch from './components/AppearanceSwitch'
import Link from 'next/link'

import './css/globals.css'

import Icon from './icons/Icon'
import Provider from './provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="font-sans dark:bg-[#121212] dark:text-white p-6">
        <Provider>
          {children}
          <footer className="flex mx-auto justify-center items-center my-10">
            <ApperanceSwitch />
            <a
              href="https://github.com/hyoban/blog-next-notion"
              target="_blank"
              rel="noreferrer">
              <Icon className="i-carbon-logo-github"></Icon>
            </a>
            <Link href="/feed">
              <Icon className="i-carbon-rss"></Icon>
            </Link>
          </footer>
        </Provider>
      </body>
    </html>
  )
}
