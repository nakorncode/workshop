'use client'

import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation'
import { Code } from './Code'

export default function ClientComponent() {
  const router = useRouter()
  function goHome() {
    setTimeout(() => {
      router.push('/') // เปรียบเสมือนคลิกลิงก์ <Link href="/">
    }, 3000)
  }
  return (
    <>
      <h2 className="text-lg font-bold mb-2">Client Components</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><Code>useParams()</Code> {useParams().name}</li>
        <li><Code>usePathname()</Code> {usePathname()}</li>
        <li>
          <Code>useSearchParams()</Code>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            {Array.from(useSearchParams()).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </li>
        <li>
          <Code>useRouter()</Code>
          <button onClick={goHome} className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer">Back to home after 3 seconds</button>
        </li>
      </ul>
    </>
  )
}
