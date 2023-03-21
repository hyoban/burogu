import { Suspense } from "react";

import PostList from "@/app/components/PostList";
import { siteName } from "@/site.config.cjs";

export default function PostListPage({}) {
	return (
		<Suspense fallback={<div>Loading post list...</div>}>
			{/* @ts-expect-error Server Component */}
			<PostList />
		</Suspense>
	);
}

export const metadata = {
	title: "首页 | " + siteName,
};
