'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex justify-center items-center my-10">
      <span>{error.message}</span>
    </div>
  )
}
