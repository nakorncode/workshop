import Link from "next/link"

export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Use Cache</h1>
      <ul className="pl-5 list-disc space-y-1">
        <li><Link href="/12-use-cache/cache-life" className="underline text-blue-600">Cache Life</Link></li>
        <li><Link href="/12-use-cache/cache-tag" className="underline text-blue-600">Cache Tag</Link></li>
      </ul>
    </div>
  )
}
