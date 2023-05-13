import "@/app/css/globals.css"

import Footer from "@/app/components/part/Footer"
import Header from "@/app/components/part/Header"
import { ThemeProvider } from "@/app/provider"
import { cn } from "@/lib/utils"
import SITE_CONFIG from "@/site.config"
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
			className={cn(dm_mono.variable, syne_mono.variable)}
		>
			<body className="p-6 font-sans dark:bg-neutral-900 dark:text-white transition-colors duration-500">
				<ThemeProvider>
					<div className="max-w-[60ch] mx-auto">
						<Header />
						<main className="py-10 flex flex-col">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	)
}
