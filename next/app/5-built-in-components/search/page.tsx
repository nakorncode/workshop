"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// เนื่องจากปัญหาของ CSR Bailout เลยต้องอยู่ใน Suspense
// https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
function Search() {
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

export default function Page() {
  return (
    <Suspense>
      <Search />
    </Suspense>
  )
}
