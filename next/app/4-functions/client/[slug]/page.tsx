"use client"

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import Code from "../../components/Code"

export default function Page() {
  const router = useRouter()
  function redirectToHomeIn3Seconds() {
    setTimeout(() => {
      router.push("/4-functions")
    }, 3000)
  }
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Client Functions</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li><Code>useParams()</Code> <span className="font-mono">{JSON.stringify(useParams())}</span></li>
        <li><Code>usePathname()</Code> <span className="font-mono">{usePathname()}</span></li>
        <li><Code>useSearchParams()</Code> <span className="font-mono">{JSON.stringify(Array.from(useSearchParams().entries()))}</span></li>
        <li><Code>useRouter()</Code> <span className="underline text-blue-600 cursor-pointer" onClick={redirectToHomeIn3Seconds}>Redirect to Home in 3 seconds</span></li>
      </ul>
    </div>
  )
}
