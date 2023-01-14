import { SVGProps } from 'react'

export default function CarbonRss(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}>
      <path
        fill="currentColor"
        d="M8 18c-3.3 0-6 2.7-6 6s2.7 6 6 6s6-2.7 6-6s-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4s4 1.8 4 4s-1.8 4-4 4zm22-4h-2C28 13 19 4 8 4V2c12.1 0 22 9.9 22 22z"></path>
      <path
        fill="currentColor"
        d="M22 24h-2c0-6.6-5.4-12-12-12v-2c7.7 0 14 6.3 14 14z"></path>
    </svg>
  )
}
