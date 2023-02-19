export default function PostDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className="flex w-full flex-col gap-6">{children}</article>;
}
