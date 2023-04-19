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
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react"

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

	const [tabBoundingBox, setTabBoundingBox] = useState<DOMRect | null>(null)
	const [wrapperBoundingBox, setWrapperBoundingBox] = useState<DOMRect | null>(
		null
	)
	const [highlightedTab, setHighlightedTab] = useState<string>("切换主题")

	const highlightRef = useRef<HTMLDivElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)

	const repositionHighlight = (element: Element, tab: string) => {
		setTabBoundingBox(element.getBoundingClientRect())
		setWrapperBoundingBox(wrapperRef.current?.getBoundingClientRect() ?? null)
		setHighlightedTab(tab)
	}

	const highlightByEvent = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const element = e.target as Element
		repositionHighlight(element, element.textContent ?? "")
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

	function getSelectedItem(direction: "next" | "prev") {
		const items = wrapperRef.current?.querySelectorAll(`[cmdk-item=""]`)

		if (!items) return null

		let selectedItemIndex = -1

		items.forEach((item, index) => {
			if (item.getAttribute("aria-selected") === "true") {
				selectedItemIndex = index
			}
		})

		return items[
			direction === "next" ? selectedItemIndex + 1 : selectedItemIndex - 1
		]
	}

	const highlightStyles: CSSProperties = {}
	highlightStyles.transitionDuration = "150ms"
	highlightStyles.opacity = highlightedTab ? 1 : 0
	highlightStyles.height = tabBoundingBox?.height
		? `${tabBoundingBox.height}px`
		: "44px"
	if (tabBoundingBox && wrapperBoundingBox) {
		highlightStyles.transform = `translate(0, ${
			tabBoundingBox.bottom - wrapperBoundingBox.top
		}px)`
	} else {
		// 26 + 12 + 49
		highlightStyles.transform = "translate(0, 83px)"
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
				onKeyDown={(e) => {
					if (e.key === "ArrowDown" || e.key === "ArrowUp") {
						const selectedItem = getSelectedItem(
							e.key === "ArrowDown" ? "next" : "prev"
						)
						if (selectedItem) {
							repositionHighlight(
								selectedItem,
								selectedItem.getAttribute("data-value") ?? ""
							)
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
							top: "4px",
							left: "8px",
							borderRadius: "4px",
							transition: "0.15s ease",
							transitionProperty: "height, transform, opacity",
							...highlightStyles,
						}}
						className="bg-neutral-100 dark:bg-neutral-700 absolute w-[calc(100%-16px)]"
					></div>
					<CommandEmpty>未找到你所需要的</CommandEmpty>
					{searchText.length === 0 && (
						<>
							<CommandGroup heading="操作">
								<CommandItem
									onSelect={toggleDark}
									onPointerEnter={highlightByEvent}
								>
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
