"use client"

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="max-w-md">
      <h1 className="text-xl font-bold mb-5">Error</h1>
      <p className="text-red-500">{error.message}</p>
    </div>
  )
}
