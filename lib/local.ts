import { LocalPost, Metadata } from "@/types/post"
import { promises as fs } from "fs"
import { serialize } from "next-mdx-remote/serialize"

export async function getPostFromLocal(permalink: string): Promise<LocalPost> {
	const raw = await fs.readFile(
		`posts/${permalink.replace(/\.md$/, "")}.md`,
		"utf-8"
	)

	const serialized = await serialize(raw, {
		parseFrontmatter: true,
	})
	const frontmatter = serialized.frontmatter as Metadata

	return {
		metadata: frontmatter,
		// remove frontmatter from content
		content: raw.replace(/---(.|\n)*?---/, "").trim(),
	}
}

export async function getMetadataListLocal(): Promise<Metadata[]> {
	const posts = await fs.readdir("posts")

	const postsData = await Promise.all(
		posts.map(async (post) => {
			return (await getPostFromLocal(post)).metadata
		})
	)

	return postsData.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime()
	})
}
