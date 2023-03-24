import CommandMenu from "@/app/components/CommandMenu"
import { getPostList } from "@/lib/notion"

export default async function CommandMenuInServer() {
	const posts = await getPostList()

	return (
		<CommandMenu
			posts={
				posts?.map((post) => ({
					title: post.title,
					description: post.description,
					slug: post.slug,
					tags: post.tags,
				})) ?? []
			}
		/>
	)
}
