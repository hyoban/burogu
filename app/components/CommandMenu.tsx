"use client"

import * as React from "react"

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/app/components/Command"
import type { NotionPost } from "@/lib/notionType"
import { useRouter } from "next/navigation"

export default function CommandMenu({
	posts,
}: {
	posts: Array<Pick<NotionPost, "title" | "tags" | "description" | "slug">>
}) {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)
	const [searchText, setSearchText] = React.useState("")
	const searchResults = React.useMemo(() => {
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

	console.log(searchResults)

	React.useEffect(() => {
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
					搜索{" "}
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
					<CommandEmpty>未找到文章</CommandEmpty>
					{searchResults.length > 0 && (
						<CommandGroup heading="文章">
							{searchResults.map((post) => (
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
