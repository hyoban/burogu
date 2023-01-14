import { CarbonMoon } from './CarbonMoon'
import { CarbonSun } from './CarbonSun'

const icons = {
  CarbonMoon: <CarbonMoon />,
  CarbonSun: <CarbonSun />,
}

export interface IconProps {
  name: keyof typeof icons
  className?: string
}

export default function Icon({ name, className }: IconProps) {
  const Icon = icons[name]
  return <span className={className}>{Icon}</span>
}
