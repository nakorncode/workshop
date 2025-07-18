"use client"

import { useSearchParams } from "next/navigation"

export default function Page() {
  const searchParams = useSearchParams()
  const keyword = searchParams.get("keyword")
  const category = searchParams.get("category")
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Search Page</h1>
      <ul className="list-disc pl-5">
        <li>Keyword: {keyword}</li>
        <li>Category: {category}</li>
      </ul>
    </div>
  )
}
