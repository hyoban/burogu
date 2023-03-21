import { ScrollArea } from "@/app/components/ScrollArea";
import { getFeedInfoList } from "@/lib/notion";
import Image from "next/image";

export default async function FeedInfoList({}) {
  const feedInfoList = await getFeedInfoList();
  if (!feedInfoList) return null;

  return (
    <div className="absolute top-0 right-0 translate-x-[130%] ">
      <ScrollArea className="h-[600px] rounded-md border p-4 hidden xl:block">
        {feedInfoList
          // sort by title
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((feedInfo) => (
            <div key={feedInfo.id} className="flex items-center gap-4 my-2">
              <Image
                src={feedInfo.avatar}
                alt="feed item avatar"
                width={40}
                height={40}
                className="h-[40px] w-[40px] rounded-full object-cover"
              />
              <a href={feedInfo.url} target="_blank" rel="noopener noreferrer">
                {feedInfo.title}
              </a>
            </div>
          ))}
      </ScrollArea>
    </div>
  );
}
