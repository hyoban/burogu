import config from '@/site.config.cjs'

import Icon from '@/app/icons/Icon'

export default async function Home({}) {
  return (
    <div className="my-6 flex flex-col gap-4">
      <p>{config.fullDescription}</p>
      <p>
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
    </div>
  )
}
