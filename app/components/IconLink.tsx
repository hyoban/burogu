import { cn } from "@/lib/utils"

export default function IconLink({
	type,
	href,
	className = "",
	iconOnly = false,
}: {
	type: "GitHub" | "Twitter" | "Email"
	href: string
	className?: string
	iconOnly?: boolean
}) {
	const icon = (
		<div
			className={cn(
				type === "GitHub"
					? "i-carbon-logo-github"
					: type === "Twitter"
					? "i-carbon-logo-twitter"
					: type === "Email"
					? "i-carbon-email"
					: "",
				"print:hidden",
				className
			)}
		></div>
	)

	if (iconOnly) {
		return icon
	}

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"flex items-center justify-center w-8 h-8 rounded-full print:inline print:h-auto print:w-auto",
				type === "GitHub"
					? "bg-gray-800 dark:bg-gray-700"
					: type === "Twitter"
					? "bg-blue-500 dark:bg-blue-600"
					: type === "Email"
					? "bg-gray-500 dark:bg-gray-400"
					: ""
			)}
		>
			{icon}
			<span className="hidden print:inline">{href}</span>
		</a>
	)
}
