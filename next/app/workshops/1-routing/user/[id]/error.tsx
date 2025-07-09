'use client' // error.tsx จำเป็นต้องใช้ 'use client'

import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <>
      <h1 className="text-xl font-bold mb-3 text-red-400">❌ Something went wrong: {error.message}</h1>
      <Link href="/workshops/1-routing/user" className="text-blue-600 underline">Return to User List</Link>
    </>
  )
}
