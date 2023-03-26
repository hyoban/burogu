import "@/app/css/globals.css"

import Footer from "@/app/components/Footer"
import { AnalyticsWrapper, ThemeProvider } from "@/app/provider"
import config from "@/site.config.cjs"
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { DM_Mono } from "next/font/google"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(config.timeZone)

// https://beta.nextjs.org/docs/optimizing/fonts#with-tailwind-css
const font = DM_Mono({
	variable: "--font-dm-mono",
	weight: ["300", "400", "500"],
	subsets: ["latin"],
})

// https://beta.nextjs.org/docs/api-reference/metadata
export const metadata = {
	title: {
		default: config.siteName,
		template: `%s | ${config.siteName}`,
	},
	description: config.description,
	icons: {
		icon: config.faviconPath,
	},
	openGraph: {
		title: config.authorName,
		description: config.description,
		url: config.siteUrl,
		siteName: config.siteName,
		locale: config.siteLanguage,
		type: "website",
		images: [
			{
				url: config.siteUrl + config.avatarPath,
			},
		],
	},
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
	twitter: {
		title: config.authorName,
		card: "summary_large_image",
	},
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
			lang={config.siteLanguage}
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
					<div className="flex w-full max-w-[64ch] flex-col justify-between">
						<main className="flex w-full flex-col items-start">{children}</main>
						<Footer className="mt-6 print:hidden" />
					</div>
				</ThemeProvider>
				<AnalyticsWrapper />
			</body>
		</html>
	)
}
