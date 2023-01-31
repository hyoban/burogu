import DefaultTags from '@/app/components/DefaultTags'
import { getSinglePostInfo } from '@/lib/notion'
import config from '@/site.config.cjs'

export default async function Head({ params }: { params: { slug: string } }) {
  const page = await getSinglePostInfo(params.slug, true)
  return (
    <>
      <title>{page?.title + '|' + config.siteName}</title>
      <DefaultTags />
    </>
  )
}
