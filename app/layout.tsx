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

      <body className="flex min-h-screen justify-center p-6 font-sans dark:bg-[#121212] dark:text-white md:bg-[#e6e6e6]">
        <Provider>
          <div className="flex w-full max-w-[70ch] flex-col justify-between bg-white dark:bg-[#121212] md:p-6 md:shadow-lg">
            {children}
            <Footer className="mt-6" />
          </div>
        </Provider>
      </body>
    </html>
  )
}
