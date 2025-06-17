import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/10-reference-types')({
  component: RouteComponent,
})

function RouteComponent() {
  const [todo, setTodo] = useState<string[]>([])
  const [todoText, setTodoText] = useState<string>('')
  function incorrectAddTodo() {
    todo.push(todoText)
    // ❌ เพิ่มข้อมูลได้ แต่จะไม่ Re-render เพราะ todo set reference type todo ซ้ำ
    setTodo(todo)
    // ⚠️ แต่ดูผิวเผินแล้วเราจะยังเห็นผลลัพธ์ถูกต้องปกติ เพราะ clearText() มีการ set new state
    // เลยทำให้เกิดเงื่อนไขการ Re-render แต่ถ้าลอง Comment บรรทัดล่างออก จะพบว่ามีปัญหาข้อมูลไม่อัปเดต
    clearText()
  }
  function correctAddTodo() {
    // ✅ ต้องทำการ Copied by Value ของ Array แยกออกมา ทำให้เหมือนมีการป้อนข้อมูลใหม่
    setTodo([...todo, todoText])
    clearText()
  }
  function clearText() {
    setTodoText('')
  }
  return (
    <div>
      <h1 className="text-lg font-bold">Todo List</h1>
      <ul className="list-disc pl-5 mt-1">
        {todo.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="my-2">
        <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} placeholder="Add a todo"  className="border border-gray-300 px-2 py-1 rounded"/>
        <p className="text-sm text-gray-500">Text length: {todoText.length}</p>
      </div>

      <button type="button" onClick={incorrectAddTodo} className="mr-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Add (Incorrect)</button>
      <button type="button" onClick={correctAddTodo} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Add (Correct)</button>
    </div>
  )
}
