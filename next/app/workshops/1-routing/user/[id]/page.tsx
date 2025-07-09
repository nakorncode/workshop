// Dynamic Route Segment

import { notFound } from 'next/navigation'

export const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Bob Smith' },
]

export async function generateStaticParams() {
  return users.map((user) => ({ id: user.id.toString() }))
}

async function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ที่ชื่อโฟลเดอร์ [id] จะได้รับลงมายัง props.params (Promise<{ id: string }>)
export default async function Page(props: { params: Promise<{ id: string }> }) {
  await simulateDelay(1000) // จำลองว่าโหลดข้อมูลช้า 3 วินาที
  const params = await props.params
  if (Number.isNaN(Number(params.id))) {
    throw new Error('Invalid user ID') // เมื่อหมายเลข ID ไม่ใช่จำนวน ให้ throw error ระหว่าง server render จะพาไปยัง error.tsx
  }
  const user = users.find((user) => user.id.toString() === params.id)
  if (!user) {
    return notFound() // ส่งไปยังหน้า not-found.tsx เพราะไม่พบผู้ใช้งาน
  }
  return (
    <div>
      <p>User ID: {params.id}</p>
      <p>Name: {user.name}</p>
    </div>
  )
}
