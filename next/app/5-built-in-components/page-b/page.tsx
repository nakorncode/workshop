import Link from "next/link"

export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Page B</h1>
      <Link href="/5-built-in-components" className="underline text-blue-600">Back to home</Link>
    </div>
  )
}
