import CarbonLogoGithub from './CarbonLogoGithub'
import CarbonMoon from './CarbonMoon'
import CarbonRss from './CarbonRss'
import CarbonSun from './CarbonSun'
import MdiMastodon from './MdiMastodon'

export const defaultIconSize = '1.4em'

export interface IconProps {
  className: string
}

export default function Icon({ className }: IconProps) {
  const name = className.split(' ').find((name) => name.startsWith('i-'))
  switch (name) {
    case 'i-carbon-logo-github':
      return (
        <CarbonLogoGithub
          className={'inline mx-1 ' + className}
          width={defaultIconSize}
          height={defaultIconSize}
        />
      )
    case 'i-carbon-moon':
      return (
        <CarbonMoon
          className={'inline mx-1 ' + className}
          width={defaultIconSize}
          height={defaultIconSize}
        />
      )
    case 'i-carbon-rss':
      return (
        <CarbonRss
          className={'inline mx-1 ' + className}
          width={defaultIconSize}
          height={defaultIconSize}
        />
      )
    case 'i-carbon-sun':
      return (
        <CarbonSun
          className={'inline mx-1 ' + className}
          width={defaultIconSize}
          height={defaultIconSize}
        />
      )
    case 'i-mdi-mastodon':
      return (
        <MdiMastodon
          className={'inline mx-1 ' + className}
          width={defaultIconSize}
          height={defaultIconSize}
        />
      )
    default:
      return null
  }
}
