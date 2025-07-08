'use client'

import { toggleStatusTodoItem } from '@/app/lib/todo'

export default function ToggleTodoButton(props: { todoId: string }) {
  return (
    <button onClick={async () => {
      await toggleStatusTodoItem(props.todoId)
    }} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Toggle</button>
  )
}
