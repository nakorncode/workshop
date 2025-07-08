'use server'

import { addTodo } from '@/app/lib/todo'
import { revalidatePath } from 'next/cache'

export async function addTodoAction(previousState: any, formData: FormData) {
  const title = formData.get('title') as string
  if (title.length === 0) return { error: 'Title is required' }
  await addTodo(title)
  revalidatePath('/workshops/13-use-action-state') // สั่งให้ Server function ที่ถูกเรียกใช้งานทำการ Refresh data โดยไม่ต้องพึ่งพา use client
  return { message: 'Todo added' }
}
