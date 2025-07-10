'use client'

import { type TodoItem } from '@/app/lib/todo'
import { useActionState } from 'react'
import { addTodoAction } from './actions'

export default function TodoManager(props: { todoList: TodoItem[] }) {
  const [state, formAction, pending] = useActionState(addTodoAction, null)
  return (
    <>
      <h2 className="text-lg font-bold mb-1">useActionState()</h2>

      <ul className="list-disc pl-5">
        {props.todoList.map((todo) => (
          <li key={todo.id}>
            <span className={todo.done ? 'line-through' : ''}>{todo.title}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        {pending && <p>Loading...</p>}
        {state?.message && <p className="text-green-600">{state.message}</p>}
        {state?.error && <p className="text-red-600">{state.error}</p>}
      </div>

      <form action={formAction} className="mt-3">
        <input type="text" name="title" className="border border-gray-300 px-2 py-1 rounded" />
        <button type="submit" className="ml-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer disabled:opacity-50">
          Add
        </button>
      </form>
    </>
  )
}
