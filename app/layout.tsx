import ApperanceSwitch from './components/AppearanceSwitch'

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

      <body className="font-sans dark:bg-[#121212] dark:text-white">
        <Provider>
          {children}
          <footer className="flex mx-auto justify-center items-center my-4">
            <ApperanceSwitch />
            <a
              href="https://github.com/hyoban/blog-next-notion"
              target="_blank"
              rel="noreferrer">
              <Icon className="i-carbon-logo-github"></Icon>
            </a>
          </footer>
        </Provider>
      </body>
    </html>
  )
}
