// ตัวอย่างนี้เป็นแบบ Client Component เรียกใช้ Server Functions
// (เป็นวิธีเดิมก่อนที่จะนำเสนอ Server Actions แบบเต็มรูปแบบ)

'use client'

import { addTodo, deleteTodo, getTodoList, TodoItem as Todo, toggleStatusTodoItem, updateTodoTitle } from '@/app/lib/todo'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

function TodoItem(props: { todo: Todo; onTodoChanged: () => void }) {
  const [editing, setEditing] = useState(false)

  async function onToggleDone(id: string) {
    await toggleStatusTodoItem(id) // เรียก Server Functions ได้ทันทีโดยไม่ต้องสร้าง API Endpoint
    props.onTodoChanged()
  }

  async function onSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    await updateTodoTitle(props.todo.id, title) // เรียก Server Functions ได้ทันทีโดยไม่ต้องสร้าง API Endpoint
    setEditing(false)
    props.onTodoChanged()
  }

  async function onDelete(id: string) {
    await deleteTodo(id) // เรียก Server Functions ได้ทันทีโดยไม่ต้องสร้าง API Endpoint
    props.onTodoChanged()
  }

  return (
    <>
      <li key={props.todo.id}>
        <div className="space-x-2">
          {editing ? (
            <form onSubmit={onSave} className="inline">
              <input type="text" name="title" defaultValue={props.todo.title} className="border border-gray-300 px-1 rounded" />
              <button type="submit" className="ml-2 text-blue-600 underline cursor-pointer">Save</button>
            </form>
          ) : (
            <span onClick={() => onToggleDone(props.todo.id)} className={clsx({ 'line-through': props.todo.done }, 'cursor-pointer')}>{props.todo.title}</span>
          )}

          {!editing && <button onClick={() => setEditing(true)} type="button" className="text-blue-600 underline cursor-pointer">Edit</button>}

          <button onClick={() => onDelete(props.todo.id)} type="button" className="text-red-600 underline cursor-pointer">Delete</button>
        </div>
      </li>
    </>
  )
}

function TodoCreator(props: { onTodoAdded: () => void }) {
  const [title, setTitle] = useState('')
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await addTodo(title) // เรียก Server Functions ได้ทันทีโดยไม่ต้องสร้าง API Endpoint
    setTitle('')
    props.onTodoAdded()
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" className="border border-gray-300 px-1 rounded" required />
        <button type="submit" className="ml-2 text-blue-600 underline cursor-pointer">Add</button>
      </form>
    </>
  )
}

export default function Page() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  useEffect(() => {
    loadTodo()
  }, [])
  async function loadTodo() {
    const list = await getTodoList() // เรียก Server Functions ได้ทันทีโดยไม่ต้องสร้าง API Endpoint
    setTodoList(list)
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Server Functions</h1>
      <ul className="list-disc pl-5 space-y-1">
        {todoList.map((todo) => <TodoItem key={todo.id} todo={todo} onTodoChanged={loadTodo} />)}
      </ul>
      <div className="mt-2">
        <TodoCreator onTodoAdded={loadTodo}></TodoCreator>
      </div>
    </>
  )
}
