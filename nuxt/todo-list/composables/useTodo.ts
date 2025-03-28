import { v4 as uuid } from 'uuid'

export interface TodoListItem {
  id: string
  title: string
  done: boolean
}

export interface TodoList {
  id: string
  onlineMode: boolean
  title: string
  items: TodoListItem[]
}

let todos: Ref<TodoList[]>

export function useTodo() {
  // Singleton pattern
  if (!todos) {
    todos = useState<TodoList[]>('todos', () => [])
    watch(todos, (newTodos) => {
      const offlineNewTodos = newTodos.filter((todo) => !todo.onlineMode)
      const data = JSON.stringify(offlineNewTodos)
      localStorage.setItem('todos', data)
    }, { deep: true })
  }

  const { user } = useUser()

  function loadTodoListFromLocalStorage() {
    const data = localStorage.getItem('todos')
    if (data) {
      // validate date?
      todos.value = JSON.parse(data)
    }
  }

  async function loadTodoListFromOnline() {
    if (!user.value) {
      return
    }
    const { data } = await $fetch('/api/todos')
    const offlineTodos = todos.value.filter((todo) => !todo.onlineMode)
    todos.value = data.map((todo) => ({
      id: todo.id,
      title: todo.title,
      onlineMode: true,
      items: todo.items.map((item) => ({
        id: item.id,
        title: item.title,
        done: item.done
      }))
    })).concat(offlineTodos)
  }

  async function addTodo(title: string) {
    if (user.value) {
      const todo = await $fetch('/api/todos/create', {
        method: 'POST',
        body: { title }
      })
      todos.value.push({
        ...todo.data,
        onlineMode: true,
        items: []
      })
    } else {
      todos.value.push({
        id: uuid(),
        onlineMode: user.value !== null,
        title,
        items: []
      })
    }
  }

  async function updateTodoTitle(id: string, newTitle: string) {
    if (user.value) {
      await $fetch('/api/todos/title', {
        method: 'PATCH',
        body: {
          id,
          title: newTitle
        }
      })
    }
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      todo.title = newTitle
    }
  }

  async function removeTodo(id: string) {
    if (user.value) {
      await $fetch('/api/todos', {
        method: 'DELETE',
        body: { id }
      })
    }
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  function getTodo(id: string) {
    const todo = todos.value.find((todo) => todo.id === id)
    if (!todo) {
      throw new Error('Todo not found')
    }
    const addItem = (title: string) => {
      todo.items.push({
        id: uuid(),
        title,
        done: false
      })
    }
    const updateItemTitle = (id: string, newTitle: string) => {
      const item = todo.items.find((item) => item.id === id)
      if (item) {
        item.title = newTitle
      }
    }
    const markItemDone = (id: string) => {
      const item = todo.items.find((item) => item.id === id)
      if (item) {
        item.done = true
      }
    }
    const markItemUndone = (id: string) => {
      const item = todo.items.find((item) => item.id === id)
      if (item) {
        item.done = false
      }
    }
    const removeItem = (id: string) => {
      todo.items = todo.items.filter((item) => item.id !== id)
    }
    return {
      todo,
      addItem,
      updateItemTitle,
      markItemDone,
      markItemUndone,
      removeItem
    }
  }

  async function syncTodo(id: string) {
    const { todo } = getTodo(id)
    if (todo.onlineMode) {
      return
    }
    const { message } = await $fetch('/api/todos/sync', {
      method: 'POST',
      body: todo
    })
    todo.onlineMode = true
    return { message }
  }

  return {
    todos,
    addTodo,
    updateTodoTitle,
    removeTodo,
    getTodo,
    loadTodoListFromLocalStorage,
    loadTodoListFromOnline,
    syncTodo
  }
}
