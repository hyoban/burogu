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
import { cn } from "@/lib/utils"
import SITE_CONFIG from "@/site.config"
import { useRouter } from "next/navigation"
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react"

const links = [
	...SITE_CONFIG.links
		.filter((link) => link.type !== "Email")
		.map((link) => ({
			title: link.type,
			href: link.url,
			icon: (
				<IconLink
					type={link.type}
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

	const [mounted, setMounted] = useState(false)
	const [isDark, toggleDark] = useDark()

	useEffect(() => {
		setMounted(true)
	}, [])

	const [tabBoundingBox, setTabBoundingBox] = useState<DOMRect | null>(null)
	const [wrapperBoundingBox, setWrapperBoundingBox] = useState<DOMRect | null>(
		null
	)

	const highlightRef = useRef<HTMLDivElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	const repositionHighlight = (element: Element) => {
		setTabBoundingBox(element.getBoundingClientRect())
		setWrapperBoundingBox(wrapperRef.current?.getBoundingClientRect() ?? null)
	}

	const highlightByEvent = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const element = e.target as Element
		repositionHighlight(element)
	}

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			// command + k
			if (e.metaKey && e.key === "k") {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener("keydown", down)
		return () => {
			document.removeEventListener("keydown", down)
		}
	}, [])

	const highlightStyles: CSSProperties = {}
	if (tabBoundingBox && wrapperBoundingBox) {
		highlightStyles.transform = `translate(0, ${
			tabBoundingBox.top - wrapperBoundingBox.y
		}px)`
	} else {
		highlightStyles.transform = `translate(0, 38px)`
	}

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
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				onKeyUp={(e) => {
					if (e.key === "ArrowDown" || e.key === "ArrowUp") {
						const selectedItem = wrapperRef.current?.querySelector(
							`[cmdk-item=""][aria-selected="true"]`
						)
						if (selectedItem) {
							repositionHighlight(selectedItem)
						}
					}
				}}
			>
				<CommandInput
					placeholder="输入文章信息以搜索"
					value={searchText}
					onValueChange={setSearchText}
				/>
				<CommandList ref={wrapperRef}>
					<div
						ref={highlightRef}
						style={{
							...highlightStyles,
						}}
						className="bg-neutral-100 dark:bg-neutral-700 absolute w-[calc(100%-16px)] transition-transform duration-150 ease-in-out left-2 rounded-md h-11"
					></div>
					<CommandEmpty>未找到你所需要的</CommandEmpty>
					{searchText.length === 0 && (
						<>
							<CommandGroup heading="操作">
								<CommandItem
									onSelect={() => {
										toggleDark()
										setOpen(false)
									}}
									onPointerEnter={highlightByEvent}
								>
									<div
										className={cn(
											"text-lg mr-2",
											!mounted
												? "i-carbon-contrast"
												: isDark
												? "i-carbon-moon"
												: "i-carbon-sun"
										)}
									/>
									切换主题
								</CommandItem>
							</CommandGroup>

							<CommandGroup heading="链接">
								{links.map((link) => (
									<CommandItem
										key={link.href}
										onSelect={() => {
											window.open(link.href, "_blank")
											setOpen(false)
										}}
										onPointerEnter={highlightByEvent}
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
										setOpen(false)
									}}
									onPointerEnter={highlightByEvent}
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
