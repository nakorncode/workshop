// ส่วนนี้จะเป็น Server Component ดังนั้นการเรียกใช้งาน Server Functions ใหม่อีกครั้ง
// อาจจะจำเป็นต้องเรียก Revalidate Function ซึ่งขึ้นอยู่กับว่าต้องการแบบ Path หรือ Tag name
// โดยจากตัวอย่างนี้แนะนำให้แก้ไข เพิ่ม revalidatePath() ที่ไฟล์ @/app/lib/todo เพื่อดูผลลัพธ์

import { addTodo, getTodoList } from '@/app/lib/todo'
import clsx from 'clsx'
import ToggleTodoButton from './ToggleTodoButton'

export default async function Page() {
  const todo = await getTodoList()
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Server Actions</h1>
      <ul className="list-disc pl-5 space-y-1">
        {todo.map((todo) => (
          <li key={todo.id}>
            <span className={clsx({ 'line-through': todo.done })}>{todo.title}</span>
            <span className="ml-2">
              {/* กรณีที่ต้องการใช้ onClick ซึ่งจัดว่าเป็น Event handler เราจึงจำเป็นต้องสร้าง Client Components แยก */}
              <ToggleTodoButton todoId={todo.id}></ToggleTodoButton>
            </span>
          </li>
        ))}
      </ul>

      {/* เป็นการออกแบบฟอร์มให้ใช้ Server Actions จากการรับ FormData ผ่าน Server Functions */}
      <form className="mt-3" action={async (formData: FormData) => {
        'use server'
        const title = formData.get('title') as string
        await addTodo(title)
      }}>
        <input type="text" name="title" className="border border-gray-300 px-1 rounded" />
        <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded cursor-pointer">Add</button>
      </form>
    </>
  )
}
