import FeedInfoList from "@/app/components/FeedInfoList";
import FeedList from "@/app/components/FeedList";
import { getFeedInfoList, getFeedList } from "@/lib/notion";
import { siteName } from "@/site.config.cjs";
import { Suspense } from "react";

export const revalidate = 100;

async function FeedListServer({}) {
  const feedInfoList = await getFeedInfoList();
  if (!feedInfoList) return null;
  const feedList = await getFeedList(feedInfoList);
  if (!feedList) return null;
  return <FeedList feedList={feedList} />;
}

export default async function FeedListPage({}) {
  return (
    <>
      <Suspense fallback={<p>Loading FeedInfoList...</p>}>
        {/* @ts-expect-error Server Component */}
        <FeedListServer />
      </Suspense>
      {/* @ts-expect-error Server Component */}
      <FeedInfoList />
    </>
  );
}

export const metadata = {
  title: "订阅列表 | " + siteName,
};
