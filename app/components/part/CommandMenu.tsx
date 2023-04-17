"use client"

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/app/components/part/Command"
import IconLink from "@/app/components/ui/IconLink"
import { useDark } from "@/app/hooks/useDark"
import type { NotionPost } from "@/lib/notionType"
import SITE_CONFIG from "@/site.config"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const links = [
	...SITE_CONFIG.links
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
			// command + k
			if (e.metaKey && e.key === "k") {
				e.preventDefault()
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
					className="text-xl text-neutral-500 dark:text-neutral-400"
					onClick={() => setOpen((open) => !open)}
				>
					⌘
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
