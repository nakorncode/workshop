// Dynamic Route Segment

import { notFound } from 'next/navigation'
import ShowUserInfo from './ShowUserInfo'
import { Metadata } from 'next'
import { siteName } from '../lib/siteName'
import { users } from '../lib/users'

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params
  const user = users.find((user) => user.id.toString() === params.id)
  return {
    title: `${user?.name || `User ID: ${params.id}`} | ${siteName}`
  }
}

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
    return notFound()
  }
  return (
    <ShowUserInfo username={user.name}></ShowUserInfo>
  )
}
