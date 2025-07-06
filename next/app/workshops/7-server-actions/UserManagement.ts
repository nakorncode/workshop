'use server'

import { redirect } from 'next/navigation'

interface User {
  id: number
  username: string
  password: string
}

const users: User[] = []

export async function createUser(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const user = {
    id: users.length + 1,
    username,
    password
  }
  users.push(user)
  redirect('/workshops/7-server-actions') // ใช้เป็นการชั่วคราว เนื่องจากยังไม่ได้สอนวิธีการ Refresh data เลยใช้วิธี Reload หน้าเว็บแทน
}

export async function listUser() {
  return users
}
