import "@/styles/globals.css"

import { ThemeProvider } from "@/app/provider"
import { sharedMetadata } from "@/app/shared-metadata"
import Footer from "@/components/part/Footer"
import Header from "@/components/part/Header"
import SITE_CONFIG from "@/config/site.config"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"
import { DM_Mono, Syne_Mono } from "next/font/google"

// https://beta.nextjs.org/docs/optimizing/fonts#with-tailwind-css
const dm_mono = DM_Mono({
	variable: "--font-dm-mono",
	weight: ["300", "400", "500"],
	subsets: ["latin"],
})

const syne_mono = Syne_Mono({
	variable: "--font-syne-mono",
	weight: ["400"],
	subsets: ["latin"],
})

// https://beta.nextjs.org/docs/api-reference/metadata
export const metadata = {
	// https://beta.nextjs.org/docs/api-reference/metadata#metadatabase
	metadataBase: new URL(SITE_CONFIG.siteUrl),
	title: SITE_CONFIG.siteName,
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
			color: "#fff",
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: "#171717",
		},
	],
	alternates: {
		types: {
			"application/rss+xml": "/rss.xml",
		},
	},
	...sharedMetadata,
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
			className={cn(dm_mono.variable, syne_mono.variable)}
		>
			<body className="p-8 font-sans transition-colors duration-500 dark:bg-neutral-900 dark:text-white">
				<ThemeProvider>
					<div className="mx-auto max-w-[60ch]">
						<Header />
						<main className="flex flex-col py-8">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	)
}
