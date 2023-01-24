import './css/globals.css'

import Provider from './provider'
import Footer from './components/Footer'

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
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  )
}
