import config from '@/site.config.cjs'

export default function DefaultTags() {
  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={config.description} />
      <link rel="icon" href={config.faviconPath} />
    </>
  )
}
