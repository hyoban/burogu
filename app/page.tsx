import { Suspense } from 'react'
import Image from 'next/image'

import Icon from '@/app/icons/Icon'

import config from '../site.config.cjs'
import PostList from './components/PostList'
import FeedList from './components/FeedList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/Tabs'

export default async function Home({}) {
  return (
    <main className="flex w-full flex-col items-start">
      <header className="flex items-center gap-6">
        <div className="flex items-center space-x-4">
          <Image
            className="h-16 w-16 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
            src={config.avatarPath}
            alt=""
            width={64}
            height={64}
          />
          <div className="font-medium dark:text-white">
            <div className="mb-1 text-xl">{config.authorName}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {config.shortDescription}
            </div>
          </div>
        </div>
      </header>
      <p className="mt-8">{config.fullDescription}</p>
      <p className="mt-4">
        <span>Find me on </span>
        {config.links.map((link) => {
          switch (link.type) {
            case 'GitHub':
              return (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.url}>
                  <Icon className="i-carbon-logo-github" />
                </a>
              )
            case 'Mastodon':
              return (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={link.url}>
                  <Icon className="i-mdi-mastodon" />
                </a>
              )
          }
        })}
      </p>
      <article className="my-8 flex w-full flex-col gap-6">
        <Tabs defaultValue="post">
          <TabsList>
            <TabsTrigger value="post">Posts</TabsTrigger>
            <TabsTrigger value="feed">Feed</TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Suspense fallback={<div>Loading post list...</div>}>
              {/* @ts-expect-error Server Component */}
              <PostList />
            </Suspense>
          </TabsContent>
          <TabsContent value="feed" className="w-full">
            <Suspense fallback={<div>Loading my feed list...</div>}>
              {/* @ts-expect-error Server Component */}
              <FeedList />
            </Suspense>
          </TabsContent>
        </Tabs>
      </article>
    </main>
  )
}
