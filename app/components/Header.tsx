import Avatar from "@/app/components/Avatar";
import Nav from "@/app/components/Nav";
import config from "@/site.config.cjs";

export default function Header({}) {
  return (
    <header className="flex w-full items-center justify-between gap-6">
      <div className="flex items-center space-x-4">
        <Avatar />
        <div className="hidden font-medium dark:text-white sm:block">
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
