import { type FunctionalComponent, watch } from 'vue'
import { type TodoItem } from '../types'

type Props = {
  todoList: TodoItem[]
}

type Events = {
  'update:todoList': [data: TodoItem[]]
  allFinished: []
}

export const JSXTodo: FunctionalComponent<Props, Events> = (props, context) => {
  const todoList = props.todoList

  function onAddTodoItem(event: Event) {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    todoList.push({ text: formData.get('todo') as string, done: false })
    target.reset()
    context.emit('update:todoList', todoList)
  }

  function toggleStatusTodoItem(index: number) {
    todoList[index].done = !todoList[index].done
    context.emit('update:todoList', todoList)
  }

  function deleteTodoItem(index: number) {
    todoList.splice(index, 1)
    context.emit('update:todoList', todoList)
  }

  // ⚠️เนื่องจาก JSX จะรัน Render ใหม่ทุกครั้งที่มีการเปลี่ยนแปลง จึงอาจจะทำให้เกิดการ watchEffect
  // ถูกทบตามจำนวนที่เปลี่ยนแปลง จึงต้องใช้ once: true แทน
  watch(todoList, () => {
    if (props.todoList.every(item => item.done)) {
      context.emit('allFinished')
    }
  }, { once: true })

  return (
    <>
      <ul class="list-disc pl-6 mb-3 space-y-1">
        {todoList?.length > 0
          ? todoList.map((item, index) => (
            <li>
              <div class="flex items-center gap-2">
                <button type="button" class={`btn-sm ${item.done ? '!bg-green-100' : '!bg-red-100'}`} onClick={() => toggleStatusTodoItem(index)}>{item.done ? '✅' : '❌'}</button>
                <span>{item.text}</span>
                <button class="btn-sm" type="button" onClick={() => deleteTodoItem(index)}>Remove</button>
              </div>
            </li>
          ))
          : <p class="text-gray-500 italic">No todo found</p>
        }
      </ul>
      <form onSubmit={onAddTodoItem} class="flex gap-2">
        <input type="text" name="todo" placeholder="Please enter a todo" />
        <button type="submit">Add</button>
      </form>
    </>
  )
}
