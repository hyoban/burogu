export default function PostDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article className="my-8 flex w-full flex-col gap-6">{children}</article>
  )
}
