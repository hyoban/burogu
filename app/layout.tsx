import Script from 'next/script'

import Provider from './provider'
import Footer from './components/Footer'

import './css/globals.css'

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

      <body className="flex min-h-screen justify-center p-6 font-sans dark:bg-[#121212] dark:text-white">
        <Provider>
          <div className="flex w-full max-w-[70ch] flex-col justify-between">
            {children}
            <Footer className="mt-6" />
          </div>
        </Provider>
      </body>

      <Script id="postcss-viewport-height-correction">
        {`var customViewportCorrectionVariable = 'vh';
function setViewportProperty(doc) {
var prevClientHeight;
var customVar = '--' + ( customViewportCorrectionVariable || 'vh' );
function handleResize() {
    var clientHeight = window.innerHeight;
    if (clientHeight === prevClientHeight) return;
    requestAnimationFrame(function updateViewportHeight(){
        doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
        prevClientHeight = clientHeight;
    });
}
handleResize();
    return handleResize;
}
window.addEventListener('resize', setViewportProperty(document.documentElement));`}
      </Script>
    </html>
  )
}
