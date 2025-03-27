import { v4 as uuid } from 'uuid'

export interface TodoListItem {
  id: string
  title: string
  done: boolean
}

export interface TodoList {
  id: string
  title: string
  items: TodoListItem[]
}

export function useTodo() {
  const todos = useState<TodoList[]>('todos', () => [])

  function addTodo(title: string) {
    todos.value.push({
      id: uuid(),
      title,
      items: []
    })
  }

  function updateTodoTitle(id: string, newTitle: string) {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      todo.title = newTitle
    }
  }

  function removeTodo(id: string) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  return {
    todos,
    addTodo,
    updateTodoTitle,
    removeTodo
  }
}
