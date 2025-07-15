'use server'

import { revalidatePath } from 'next/cache'
// ตามปกติการเรียก Node.js API จะไม่สามารถทำบน Client โดยตรงได้
// ดังนั้นส่วนนี้คือการรันระบบหลังบ้านเท่านั้น (Server Functions)
// แต่ก็สามารถนำไปใช้กับ Client Component ได้ด้วย
import { randomUUID } from 'node:crypto'

export interface TodoItem {
  id: string
  title: string
  done: boolean
}

const todoList: TodoItem[] = [
  {  id: randomUUID(), title: 'Buy milk', done: true },
  {  id: randomUUID(), title: 'Buy bread', done: false },
  {  id: randomUUID(), title: 'Buy eggs', done: false },
]

export async function getTodoList() {
  return todoList
}

export async function getTodoFromId(id: string) {
  return todoList.find((todo) => todo.id === id)
}

export async function addTodo(title: string) {
  const todo = { id: randomUUID(), title, done: false }
  todoList.push(todo)
  // revalidatePath('/workshops/13-server-actions')
  return todo
}

export async function updateTodoTitle(id: string, title: string) {
  const todo = todoList.find((todo) => todo.id === id)
  if (!todo) throw new Error('Todo not found')
  todo.title = title
  return todo
}

export async function toggleStatusTodoItem(id: string) {
  const todo = todoList.find((todo) => todo.id === id)
  if (!todo) throw new Error('Todo not found')
  todo.done = !todo.done
  // revalidatePath('/workshops/13-server-actions')
  return todo
}

export async function deleteTodo(id: string) {
  const index = todoList.findIndex((todo) => todo.id === id)
  if (index === -1) throw new Error('Todo not found')
  todoList.splice(index, 1)
}
