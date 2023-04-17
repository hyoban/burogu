import { getSinglePostContent, getSinglePostInfo } from "@/lib/notion"
import config from "@/site.config.cjs"
import translate from "google-translate-api-x"
import { notFound } from "next/navigation"
import { ImageResponse } from "next/server"

export const alt = config.siteName
export const size = {
	width: 1024,
	height: 512,
}
export const contentType = "image/png"

async function translateChineseToEnglish(input: string) {
	const res = await translate(input, { to: "en" })
	return res.text
}

export const revalidate = 7200

export default async function og({ params }: { params: { slug: string } }) {
	const fetchPage = getSinglePostInfo(params.slug, true)
	const fetchBlocks = getSinglePostContent(params.slug, true)

	const [page, blocks] = await Promise.all([fetchPage, fetchBlocks])
	if (!page || !blocks) notFound()

	const headings = blocks
		.filter((block) => {
			switch (block.cur.type) {
				case "heading_1":
					return true
				case "heading_2":
					return true
				case "heading_3":
					return true
			}
		})
		.slice(0, 4)
		.map((block) => {
			switch (block.cur.type) {
				case "heading_1":
					return block.cur?.heading_1.rich_text
						.map((i) => i.plain_text)
						.join("")
				case "heading_2":
					return block.cur?.heading_2.rich_text
						.map((i) => i.plain_text)
						.join("")
				case "heading_3":
					return block.cur?.heading_3.rich_text
						.map((i) => i.plain_text)
						.join("")
			}
		})
		.map((heading) => {
			return translateChineseToEnglish(heading ?? "")
		})
	const translatedHeadings = await Promise.all(headings)

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: "48",
					color: "#fafafa",
					background: "#171717",
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "space-between",
					padding: "32px",
				}}
			>
				<h1>{config.siteUrl.slice(8) + "/post/" + page.slug}</h1>
				<ul
					style={{
						fontSize: "32",
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "space-between",
					}}
				>
					{translatedHeadings.map((heading) => (
						<li key={heading}> {`- ${heading}`}</li>
					))}
				</ul>
			</div>
		),
		size
	)
}
