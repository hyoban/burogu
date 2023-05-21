const SITE_CONFIG = {
	siteName: "Hyoban's Blog",
	siteLanguage: "zh-Hans",
	description: "Hyoban 的个人博客，胡乱写些东西",
	avatarPath: "/hyoban.png",
	faviconPath: "/favicon.svg",
	links: [
		{
			type: "GitHub",
			url: "https://github.com/hyoban",
		},
		{
			type: "Twitter",
			url: "https://twitter.com/0xhyoban",
		},
		{
			type: "Email",
			url: "mailto:hi@hyoban.cc",
		},
	],
	codeTheme: {
		light: "nord",
		dark: "nord",
	},
	siteUrl: "https://hyoban.cc",
	authorName: "Hyoban",
	authorLink: "https://hyoban.cc",
	authorEmail: "hi@hyoban.cc",
	timeZone: "Asia/Shanghai",
	source: "local",
} as const

export default SITE_CONFIG
