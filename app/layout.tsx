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

      <body className="p-6 font-sans dark:bg-[#121212] dark:text-white">
        <Provider>
          {children}
          <footer className="mx-auto my-10 flex items-center justify-center">
            <ApperanceSwitch />
            <a
              href="https://github.com/hyoban/blog-next-notion"
              target="_blank"
              rel="noreferrer">
              <Icon className="i-carbon-logo-github"></Icon>
            </a>
            <a href="/feed" target="_blank" rel="noreferrer">
              <Icon className="i-carbon-rss"></Icon>
            </a>
          </footer>
        </Provider>
      </body>
    </html>
  )
}
