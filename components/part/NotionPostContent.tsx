import "@/lib/dayjs"

import Prose from "@/components/ui/Prose"
import SITE_CONFIG from "@/config/site.config"
import { getPostContentNotion } from "@/lib/notion"
import { NotionContentType } from "@/types/post"
import {
	BookmarkBlockObjectResponse,
	BulletedListItemBlockObjectResponse,
	CalloutBlockObjectResponse,
	CodeBlockObjectResponse,
	EmbedBlockObjectResponse,
	Heading1BlockObjectResponse,
	Heading2BlockObjectResponse,
	Heading3BlockObjectResponse,
	ImageBlockObjectResponse,
	MentionRichTextItemResponse,
	NumberedListItemBlockObjectResponse,
	ParagraphBlockObjectResponse,
	RichTextItemResponse,
	TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"
import dayjs from "dayjs"
import * as fs from "fs/promises"
import { NextTweet } from "next-tweet"
import Image from "next/image"
import { join as pathJoin } from "path"
import { IThemedToken, getHighlighter, renderToHtml } from "shiki"

const RichText = ({
	richText,
}: {
	richText: TextRichTextItemResponse | MentionRichTextItemResponse
} & BasicProps) => {
	if (richText.type === "text") {
		if (richText.href !== null) {
			return (
				<a href={richText.href} target="_blank" rel="noreferrer">
					<RichText
						richText={{
							...richText,
							href: null,
						}}
					/>
				</a>
			)
		}

		if (richText.annotations.bold) {
			return (
				<b>
					<RichText
						richText={{
							...richText,
							annotations: {
								...richText.annotations,
								bold: false,
							},
						}}
					/>
				</b>
			)
		}
		if (richText.annotations.italic) {
			return (
				<i>
					<RichText
						richText={{
							...richText,
							annotations: {
								...richText.annotations,
								italic: false,
							},
						}}
					/>
				</i>
			)
		}
		if (richText.annotations.strikethrough) {
			return (
				<s>
					<RichText
						richText={{
							...richText,
							annotations: {
								...richText.annotations,
								strikethrough: false,
							},
						}}
					/>
				</s>
			)
		}
		if (richText.annotations.underline) {
			return (
				<u>
					<RichText
						richText={{
							...richText,
							annotations: {
								...richText.annotations,
								underline: false,
							},
						}}
					/>
				</u>
			)
		}
		if (richText.annotations.code) {
			return (
				<code>
					<RichText
						richText={{
							...richText,
							annotations: {
								...richText.annotations,
								code: false,
							},
						}}
					/>
				</code>
			)
		}
		return <>{richText.plain_text}</>
	}

	if (richText.type === "mention") {
		if (richText.href !== null) {
			return (
				<a href={richText.href} target="_blank" rel="noreferrer">
					{richText.href.startsWith("https://github.com/") ? (
						<>
							<span className="i-carbon-logo-github mx-0 align-text-bottom"></span>
							<span className="ml-1">{richText.href.slice(19)}</span>
						</>
					) : (
						<RichText
							richText={{
								...richText,
								href: null,
							}}
						/>
					)}
				</a>
			)
		}
	}

	return <>{richText.plain_text}</>
}

const RichTextGroup = ({
	richTexts,
}: {
	richTexts: RichTextItemResponse[]
} & BasicProps) => {
	return (
		<>
			{richTexts
				.filter((i) => i.type === "text" || i.type === "mention")
				.map((i) => (
					<RichText
						key={i.plain_text}
						richText={i as TextRichTextItemResponse}
					/>
				))}
		</>
	)
}

export const PBlock = ({
	block,
	children,
}: { block: ParagraphBlockObjectResponse } & BasicProps) => {
	return (
		<p>
			{children ? (
				children
			) : (
				<RichTextGroup richTexts={block.paragraph.rich_text} />
			)}
		</p>
	)
}

const HeaderAnchor = ({
	anchor,
	level = 1,
}: {
	anchor: string
	level?: number
}) => {
	return (
		<a
			href={`#${anchor}`}
			className="hidden no-underline opacity-0 sm:absolute sm:right-full sm:mr-2 sm:inline hover:sm:opacity-30 group-hover:sm:opacity-30"
		>
			{Array.from({ length: level }, () => "#").join("")}
		</a>
	)
}

export const H1Block = ({
	block,
	children,
	removeAnchor,
}: { block?: Heading1BlockObjectResponse } & BasicProps & TitleConfig) => {
	if (!block) return <h1>{children}</h1>

	const anchor = encodeURIComponent(
		block?.heading_1.rich_text.map((i) => i.plain_text).join("")
	)
	return (
		<h1 className="group" id={anchor}>
			{!removeAnchor && <HeaderAnchor anchor={anchor} level={1} />}
			{children ? (
				children
			) : (
				<RichTextGroup richTexts={block.heading_1.rich_text} />
			)}
		</h1>
	)
}

export const H2Block = ({
	block,
	children,
	removeAnchor,
}: { block?: Heading2BlockObjectResponse } & BasicProps & TitleConfig) => {
	if (!block) return <h2>{children}</h2>

	const anchor = encodeURIComponent(
		block.heading_2.rich_text.map((i) => i.plain_text).join("")
	)
	return (
		<h2 className="group" id={anchor}>
			{!removeAnchor && <HeaderAnchor anchor={anchor} level={2} />}
			{children ? (
				children
			) : (
				<RichTextGroup richTexts={block.heading_2.rich_text} />
			)}
		</h2>
	)
}

export const H3Block = ({
	block,
	children,
	removeAnchor,
}: { block?: Heading3BlockObjectResponse } & BasicProps & TitleConfig) => {
	if (!block) return <h3>{children}</h3>

	const anchor = encodeURIComponent(
		block.heading_3.rich_text.map((i) => i.plain_text).join("")
	)
	return (
		<h3 className="group" id={anchor}>
			{!removeAnchor && <HeaderAnchor anchor={anchor} level={3} />}
			{children ? (
				children
			) : (
				<RichTextGroup richTexts={block.heading_3.rich_text} />
			)}
		</h3>
	)
}

const CalloutBlock = ({
	block,
}: { block: CalloutBlockObjectResponse } & BasicProps) => {
	return (
		<blockquote>
			<RichTextGroup richTexts={block.callout.rich_text} />
		</blockquote>
	)
}

const BulletedListBlock = ({
	block,
	children,
}: {
	block: BulletedListItemBlockObjectResponse
} & BasicProps) => {
	return (
		<li>
			<RichTextGroup richTexts={block.bulleted_list_item.rich_text} />
			{children}
		</li>
	)
}

const NumberedListBlock = ({
	block,
	children,
}: {
	block: NumberedListItemBlockObjectResponse
} & BasicProps) => {
	return (
		<li>
			<RichTextGroup richTexts={block.numbered_list_item.rich_text} />
			{children}
		</li>
	)
}

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the "paths".
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
const getShikiPath = (): string => {
	return pathJoin(process.cwd(), "lib/shiki")
}

const touched = { current: false }

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
const touchShikiPath = (): void => {
	if (touched.current) return // only need to do once
	fs.readdir(getShikiPath()) // fire and forget
	touched.current = true
}

export const CodeBlock = async ({
	block,
}: {
	block:
		| CodeBlockObjectResponse
		| {
				code: {
					rich_text: string
					language: string
				}
		  }
} & BasicProps) => {
	const lightCodeTheme = SITE_CONFIG.codeTheme.light
	const darkCodeTheme = SITE_CONFIG.codeTheme.dark

	touchShikiPath()

	const highlighter = await getHighlighter({
		themes: [lightCodeTheme, darkCodeTheme],
		paths: {
			languages: `${getShikiPath()}/languages/`,
			themes: `${getShikiPath()}/themes/`,
		},
	})

	let code = ""
	if (typeof block.code.rich_text === "string") {
		code = block.code.rich_text
	} else {
		code = (block.code.rich_text as TextRichTextItemResponse[])
			.map((i) => i.plain_text)
			.join("")
	}

	let language = block.code.language
	if (language === "plain text") {
		language = ""
	}

	const lightTokens = highlighter.codeToThemedTokens(
		code,
		language,
		lightCodeTheme
	)
	const darkTokens = highlighter.codeToThemedTokens(
		code,
		language,
		darkCodeTheme
	)

	const customRenderToHtml = (tokens: IThemedToken[][], themeName: string) => {
		const themeBg = highlighter
			.getBackgroundColor(themeName)
			.toLocaleLowerCase()

		return renderToHtml(tokens, {
			fg: highlighter.getForegroundColor(themeName),
			bg:
				themeBg === "#ffffff" || themeBg === "#fff"
					? "#fafafa"
					: themeBg === "#171717"
					? "#24292e"
					: themeBg,
			elements: {
				pre({ style, children }) {
					return `<pre class="p-4 rounded-md my-2 overflow-y-auto" style="tab-size: 2; ${style}">${children}</pre>`
				},

				code({ children }) {
					return `<code>${children}</code>`
				},

				line({ className, children }) {
					return `<span class="${className}">${children}</span>`
				},

				token({ style, children }) {
					return `<span style="${style}">${children}</span>`
				},
			},
		})
	}

	const lightHighlightedCode = customRenderToHtml(lightTokens, lightCodeTheme)
	const darkHighlightedCode = customRenderToHtml(darkTokens, darkCodeTheme)

	return (
		<>
			<div
				className="dark:hidden "
				dangerouslySetInnerHTML={{
					__html: lightHighlightedCode,
				}}
			></div>
			<div
				className="hidden dark:block"
				dangerouslySetInnerHTML={{
					__html: darkHighlightedCode,
				}}
			></div>
		</>
	)
}

const ImageBlock = ({
	block,
}: { block: ImageBlockObjectResponse } & BasicProps) => {
	return (
		<Image
			src={
				block.image.type === "external"
					? block.image.external.url
					: block.image.file.url
			}
			alt={
				block.image.caption.length !== 0
					? block.image.caption.map((i) => i.plain_text).join("")
					: ""
			}
			sizes="100vw"
			width={0}
			height={0}
		/>
	)
}

const BookmarkBlock = ({
	block,
}: { block: BookmarkBlockObjectResponse } & BasicProps) => {
	return (
		<p>
			<a
				href={block.bookmark.url}
				target="_blank"
				rel="noreferrer"
				className="block "
			>
				{block.bookmark.caption.length !== 0 ? (
					<RichTextGroup richTexts={block.bookmark.caption} />
				) : (
					block.bookmark.url
				)}
			</a>
		</p>
	)
}

const EmbedBlock = ({ block }: { block: EmbedBlockObjectResponse }) => {
	const isTwitter = block.embed.url.includes("twitter.com")
	if (!isTwitter) return null
	const tweetId = block.embed.url.split("/").pop() as string
	return (
		<div className="not-prose">
			<NextTweet id={tweetId} />
		</div>
	)
}

type TitleConfig = {
	removeAnchor?: boolean
}

const RenderBlock = ({
	block,
	removeAnchor = false,
}: {
	block: NotionContentType[number]
} & TitleConfig) => {
	switch (block.cur.type) {
		case "paragraph":
			return <PBlock block={block.cur} />
		case "heading_1":
			return <H1Block block={block.cur} removeAnchor={removeAnchor} />
		case "heading_2":
			return <H2Block block={block.cur} removeAnchor={removeAnchor} />
		case "heading_3":
			return <H3Block block={block.cur} removeAnchor={removeAnchor} />
		case "callout":
			return <CalloutBlock block={block.cur} />
		case "bulleted_list_item":
			return (
				<BulletedListBlock block={block.cur}>
					{block.children?.some(
						(child) => child.cur.type === "bulleted_list_item"
					) ? (
						<ul>
							{block.children?.map((child) => (
								<RenderBlock
									block={child}
									key={child.cur.id}
									removeAnchor={removeAnchor}
								/>
							))}
						</ul>
					) : (
						block.children?.map((child) => (
							<RenderBlock
								block={child}
								key={child.cur.id}
								removeAnchor={removeAnchor}
							/>
						))
					)}
				</BulletedListBlock>
			)
		case "numbered_list_item":
			return (
				<NumberedListBlock block={block.cur}>
					{block.children?.some(
						(child) => child.cur.type === "numbered_list_item"
					) ? (
						<ol>
							{block.children?.map((child) => (
								<RenderBlock
									block={child}
									key={child.cur.id}
									removeAnchor={removeAnchor}
								/>
							))}
						</ol>
					) : (
						block.children?.map((child) => (
							<RenderBlock
								block={child}
								key={child.cur.id}
								removeAnchor={removeAnchor}
							/>
						))
					)}
				</NumberedListBlock>
			)
		case "code":
			// @ts-expect-error Async Server Component
			return <CodeBlock block={block.cur} />
		case "image":
			return <ImageBlock block={block.cur} />
		case "bookmark":
			return <BookmarkBlock block={block.cur} />
		case "embed":
			return <EmbedBlock block={block.cur} />
		default:
			return null
	}
}

function isJsxElementABulletedList(element: JSX.Element) {
	return element.props.block.cur.type === "bulleted_list_item"
}

function isJsxElementANumberedList(element: JSX.Element) {
	return element.props.block.cur.type === "numbered_list_item"
}

export default async function NotionPostContent({
	id,
	title,
}: {
	id: string
	title: string
}) {
	const blocks = await getPostContentNotion(id)

	if (!blocks) return null

	return (
		<Prose>
			<h1>{title}</h1>
			{blocks
				.map((block) => {
					return <RenderBlock block={block} key={block.cur.id} />
				})
				.reduce((prev, curr) => {
					if (curr === null) {
						return prev
					}

					if (prev.length === 0) {
						return [[curr]]
					}
					const last = prev[prev.length - 1]
					const lastBlock = last[last.length - 1]
					if (
						(isJsxElementABulletedList(lastBlock) &&
							isJsxElementABulletedList(curr)) ||
						(isJsxElementANumberedList(lastBlock) &&
							isJsxElementANumberedList(curr))
					) {
						return [...prev.slice(0, prev.length - 1), [...last, curr]]
					}
					return [...prev, [curr]]
				}, [] as JSX.Element[][])
				.map((blocks, i) => {
					if (blocks.length === 1) {
						return blocks[0]
					}
					const block = blocks[0]
					if (isJsxElementABulletedList(block)) {
						return <ul key={i}>{blocks}</ul>
					}
					if (isJsxElementANumberedList(block)) {
						return <ol key={i}>{blocks}</ol>
					}
					return null
				})}
			<p className="text-sm opacity-50">
				Revalidated at {dayjs().tz().format()}
			</p>
		</Prose>
	)
}
