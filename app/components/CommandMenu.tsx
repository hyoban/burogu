"use client"

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/app/components/Command"
import IconLink from "@/app/components/IconLink"
import { useDark } from "@/app/hooks/useDark"
import type { NotionPost } from "@/lib/notionType"
import config from "@/site.config.cjs"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const links = [
	...config.links
		.filter((link) => link.type !== "Email")
		.map((link) => ({
			title: link.type,
			href: link.url,
			icon: (
				<IconLink
					type={link.type as any}
					href={link.url}
					className="text-lg mr-2"
					iconOnly
				></IconLink>
			),
		})),
	{
		title: "RSS",
		href: "/rss.xml",
		icon: "i-carbon-rss",
	},
]

export default function CommandMenu({
	posts,
}: {
	posts: Array<Pick<NotionPost, "title" | "tags" | "description" | "slug">>
}) {
	const router = useRouter()

	const [open, setOpen] = useState(false)
	const [searchText, setSearchText] = useState("")
	const searchPostsResult = useMemo(() => {
		if (!searchText) return posts
		return posts.filter((post) => {
			return (
				post.title.toLowerCase().includes(searchText.toLowerCase()) ||
				post.slug.toLowerCase().includes(searchText.toLowerCase()) ||
				post.tags.some((tag) =>
					tag.toLowerCase().includes(searchText.toLowerCase())
				)
			)
		})
	}, [posts, searchText])

	const [, toggleDark] = useDark()

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && e.metaKey) {
				setOpen((open) => !open)
			}
		}

		document.addEventListener("keydown", down)
		return () => document.removeEventListener("keydown", down)
	}, [])

	return (
		<>
			<div className="flex items-center">
				<button
					className="text-sm text-neutral-500 dark:text-neutral-400"
					onClick={() => setOpen((open) => !open)}
				>
					操作{" "}
					<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-100 bg-neutral-100 px-1.5 font-mono text-[10px] font-medium text-neutral-600 opacity-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
						<span className="text-xs">⌘</span>K
					</kbd>
				</button>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="输入文章信息以搜索"
					value={searchText}
					onValueChange={setSearchText}
				/>
				<CommandList>
					<CommandEmpty>未找到你所需要的</CommandEmpty>
					{searchText.length === 0 && (
						<>
							<CommandGroup heading="操作">
								<CommandItem onSelect={toggleDark}>
									<span className="i-carbon-color-palette text-lg mr-2"></span>
									切换主题
								</CommandItem>
							</CommandGroup>

							<CommandGroup heading="链接">
								{links.map((link) => (
									<CommandItem
										key={link.href}
										onSelect={() => {
											window.open(link.href, "_blank")
										}}
									>
										{typeof link.icon === "string" ? (
											<span className={`${link.icon} text-lg mr-2`}></span>
										) : (
											link.icon
										)}
										{link.title}
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}
					{searchPostsResult.length > 0 && (
						<CommandGroup heading="文章">
							{searchPostsResult.map((post) => (
								<CommandItem
									key={post.slug}
									onSelect={() => {
										router.push(`/post/${post.slug}`)
									}}
								>
									{post.title}
								</CommandItem>
							))}
						</CommandGroup>
					)}
				</CommandList>
			</CommandDialog>
		</>
	)
}
