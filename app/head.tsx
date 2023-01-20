import config from '../siteconfig.json'

export default function Head() {
  return (
    <>
      <title>{config.siteName}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={config.description} />
      <link rel="icon" href={config.faviconPath} />
    </>
  )
}
