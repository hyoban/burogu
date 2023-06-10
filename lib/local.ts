import { LocalPost, Metadata } from "@/types/post"
import { promises as fs } from "fs"
import { serialize } from "next-mdx-remote/serialize"

export async function getPostFromLocal(fileName: string): Promise<LocalPost> {
	const slug = fileName.replace(/\.md$/, "")
	const raw = await fs.readFile(`posts/${slug}.md`, "utf-8")

	const serialized = await serialize(raw, {
		parseFrontmatter: true,
	})
	const frontmatter = serialized.frontmatter as Metadata
	// remove frontmatter from content
	const content = raw.replace(/---(.|\n)*?---/, "").trim()
	const title = content.match(/^#\s(.*)/)?.[1] ?? ""
	frontmatter.slug = slug
	frontmatter.title = title
	return {
		metadata: frontmatter,
		content: content.replace(/^#\s(.*)/, "").trim(),
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
