import { getTodoList } from '@/app/lib/todo'
import TodoManagerActionState from './TodoManagerActionState'
import TodoManagerState from './TodoManagerState'

export default async function Page() {
  const todo = await getTodoList()
  return (
    <>
      <h1 className="text-xl font-bold mb-2">Todo Manager</h1>
      <TodoManagerActionState todoList={todo}></TodoManagerActionState>
      <hr className="my-4" />
      <TodoManagerState todoList={todo}></TodoManagerState>
    </>
  )
}
