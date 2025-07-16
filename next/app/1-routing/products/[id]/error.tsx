'use client'

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg text-gray-600">{error.message || "An unexpected error occurred."}</p>
        <a href="/1-routing/products" className="text-blue-600 underline mt-4 inline-block">
          Back to Products
        </a>
      </div>
    </div>
  )
}
