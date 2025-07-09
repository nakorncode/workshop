'use client'

import { useParams } from 'next/navigation'

export default function ShowUserInfo(props: { username: string }) {
  const params = useParams<{ id: string }>() // ใช้สำหรับ Client Component
  return (
    <div>
      <p>User ID: {params.id}</p>
      <p>Name: {props.username}</p>
    </div>
  )
}
