import Footer from '@/app/components/Footer'
import { ThemeProvider } from '@/app/provider'

import '@/app/css/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="flex h-auto min-h-full justify-center p-6 font-sans dark:bg-[#121212] dark:text-white sm:px-14">
        <ThemeProvider>
          <div className="flex w-full max-w-[65ch] flex-col justify-between">
            <main className="flex w-full flex-col items-start">{children}</main>
            <Footer className="mt-6" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
