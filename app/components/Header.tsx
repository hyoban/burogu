import Nav from "@/app/components/Nav";
import config from "@/site.config.cjs";
import Image from "next/image";

export default function Header({}) {
  return (
    <header className="flex w-full items-center justify-between gap-6">
      <div className="flex items-center space-x-4">
        <a
          href={config.authorLink}
          target="_blank"
          className="hover:opacity-100"
          rel="noreferrer"
        >
          <Image
            className="h-16 w-16 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
            src={config.avatarPath}
            alt=""
            width={64}
            height={64}
          />
        </a>
        <div className=" hidden font-medium dark:text-white sm:block">
          <div className="mb-1 text-xl">{config.authorName}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {config.shortDescription}
          </div>
        </div>
      </div>
      <Nav />
    </header>
  );
}
