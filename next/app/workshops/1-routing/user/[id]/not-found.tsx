// แสดงผลสำหรับ notFound() ที่ถูกเรียกบน Dynamic Route

import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <h1 className="text-xl font-bold mb-3 text-red-400">⚠️ User Not Found</h1>
      <Link href="/workshops/1-routing/user" className="text-blue-600 underline">Return to User List</Link>
    </>
  )
}
