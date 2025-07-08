'use client'

import { type TodoItem } from '@/app/lib/todo'
import { addTodoAction } from './actions'
import { useState } from 'react'

export default function TodoManagerState(props: { todoList: TodoItem[] }) {
  const [title, setTitle] = useState('')
  const [pending, setPending] = useState(false)
  const [state, setState] = useState<{ message?: string; error?: string }>({})
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    const formData = new FormData()
    formData.set('title', title)
    const newState = await addTodoAction(state, formData)
    setState(newState)
    setPending(false)
    setTitle('')
  }
  return (
    <>
      <ul className="list-disc pl-5">
        {props.todoList.map((todo) => (
          <li key={todo.id}>
            <span className={todo.done ? 'line-through' : ''}>{todo.title}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        {pending && <p>Loading...</p>}
        {state.message && <p className="text-green-600">{state.message}</p>}
        {state.error && <p className="text-red-600">{state.error}</p>}
      </div>

      <form onSubmit={onSubmit} className="mt-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" className="border border-gray-300 px-2 py-1 rounded" />
        <button type="submit" className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer disabled:opacity-50">
          Add
        </button>
      </form>
    </>
  )
}
