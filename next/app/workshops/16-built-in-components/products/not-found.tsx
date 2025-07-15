import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <h1 className="text-xl font-bold text-red-600 mb-3">Product Not Found</h1>
      <Link href="/workshops/16-built-in-components" className="text-blue-600 underline">Back to search</Link>
    </>
  )
}
