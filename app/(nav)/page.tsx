import config from '@/site.config.cjs'

import Icon from '@/app/icons/Icon'

export default async function Home({}) {
  return (
    <div className="flex flex-col gap-4">
      {config.fullDescription.map((paragraph) => {
        return (
          <>
            <h2 className="text-2xl font-bold">{paragraph.title}</h2>
            <ul>
              {paragraph.content.map((item) => {
                return (
                  <li key={item} className="my-2">
                    {item}
                  </li>
                )
              })}
            </ul>
          </>
        )
      })}
      <p>
        你可以在
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
        找到我
      </p>
    </div>
  )
}
