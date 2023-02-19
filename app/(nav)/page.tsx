import { Suspense } from "react";

import PostList from "@/app/components/PostList";

export default function PostListPage({}) {
  return (
    <Suspense fallback={<div>Loading post list...</div>}>
      {/* @ts-expect-error Server Component */}
      <PostList />
    </Suspense>
  );
}
