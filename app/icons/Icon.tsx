export const defaultIconSize = '1.4em'

export interface IconProps {
  className: string
}

export default function Icon({ className }: IconProps) {
  return (
    <span
      className={'mx-1 ' + className}
      style={{ fontSize: defaultIconSize }}
    />
  )
}
