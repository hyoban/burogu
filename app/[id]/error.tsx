'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex h-screen justify-center items-center">
      <span>{error.message}</span>
    </div>
  )
}
