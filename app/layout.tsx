import "@/app/css/globals.css"

import Header from "@/app/components/part/Header"
import { ThemeProvider } from "@/app/provider"
import SITE_CONFIG from "@/site.config"
import { Analytics } from "@vercel/analytics/react"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { DM_Mono } from "next/font/google"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(SITE_CONFIG.timeZone)

// https://beta.nextjs.org/docs/optimizing/fonts#with-tailwind-css
const font = DM_Mono({
	variable: "--font-dm-mono",
	weight: ["300", "400", "500"],
	subsets: ["latin"],
})

// https://beta.nextjs.org/docs/api-reference/metadata
export const metadata = {
	// https://beta.nextjs.org/docs/api-reference/metadata#metadatabase
	metadataBase: new URL(SITE_CONFIG.siteUrl),
	title: {
		default: SITE_CONFIG.siteName,
		template: `%s | ${SITE_CONFIG.siteName}`,
	},
	description: SITE_CONFIG.description,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	themeColor: [
		{
			media: "(prefers-color-scheme: light)",
			color: "#ffffff",
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: "#1f1f1f",
		},
	],
	alternates: {
		types: {
			"application/rss+xml": "/rss.xml",
		},
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang={SITE_CONFIG.siteLanguage}
			suppressHydrationWarning
			className={`h-full ${font.variable}`}
		>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />

			<body className="flex h-auto min-h-full justify-center p-6 font-sans dark:bg-[#1f1f1f] dark:text-white sm:px-14 transition-colors duration-500">
				<ThemeProvider>
					<div className="flex w-full max-w-[64ch] flex-col gap-6">
						<Header />
						<main className="relative flex w-full flex-col items-start">
							{children}
						</main>
					</div>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	)
}
