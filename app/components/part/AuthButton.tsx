"use client"

import { cn } from "@/lib/utils"
import { signIn, signOut } from "next-auth/react"

export function SignInButton({ className }: { className?: string }) {
	return (
		<button
			className={cn(
				className,
				"flex items-center gap-2 px-4 py-2 rounded-md bg-black text-white dark:bg-neutral-700"
			)}
			onClick={() => {
				signIn("github")
			}}
		>
			<span className="i-carbon-logo-github text-2xl"></span>以 GitHub 账号登录
		</button>
	)
}

export function SignOutButton({ className }: { className?: string }) {
	return (
		<button
			className={cn(
				className,
				"px-4 py-2 rounded-md bg-black text-white dark:bg-neutral-700"
			)}
			onClick={() => {
				signOut()
			}}
		>
			退出登录
		</button>
	)
}
