import Icon from '../icons/Icon'
import ApperanceSwitch from './AppearanceSwitch'

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={
        'mx-auto flex flex-col items-center gap-4 font-mono opacity-60 ' +
        className
      }>
      <p>
        Powered by <a href="https://beta.nextjs.org/">Next.js</a> and{' '}
        <a href="https://tailwindcss.com/">Tailwind CSS</a>
      </p>
      <div className="flex items-center justify-center">
        <ApperanceSwitch />
        <a
          href="https://github.com/hyoban/blog-next-notion"
          target="_blank"
          rel="noreferrer">
          <Icon className="i-carbon-logo-github"></Icon>
        </a>
        <a href="/feed" target="_blank" rel="noreferrer">
          <Icon className="i-carbon-rss"></Icon>
        </a>
      </div>
    </footer>
  )
}
