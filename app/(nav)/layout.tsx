import Header from '@/app/components/Header'
import Nav from '@/app/components/Nav'

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <article className="my-8 flex w-full flex-col gap-6">
        <Nav></Nav>
        {children}
      </article>
    </>
  )
}
