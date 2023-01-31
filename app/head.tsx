import DefaultTags from '@/app/components/DefaultTags'
import config from '@/site.config.cjs'

export default function Head() {
  return (
    <>
      <title>{config.siteName}</title>
      <DefaultTags />
    </>
  )
}
