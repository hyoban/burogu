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

      <body className="flex min-h-screen justify-center bg-[#e6e6e6] p-6 font-sans dark:bg-[#121212] dark:text-white">
        <Provider>
          <div className="flex w-full max-w-[70ch] flex-col justify-between bg-white p-6 shadow-lg dark:bg-[#121212]">
            {children}
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  )
}
