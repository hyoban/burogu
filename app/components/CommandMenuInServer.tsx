import CommandMenu from "@/app/components/CommandMenu"
import { getPostList } from "@/lib/notion"

export default async function CommandMenuInServer() {
	const posts = await getPostList()

	return <CommandMenu posts={posts ?? []} />
}
