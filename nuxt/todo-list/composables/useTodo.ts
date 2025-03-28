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

  function clearTodoListOnline() {
    todos.value = todos.value.filter((todo) => !todo.onlineMode)
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
    const todo = todos.value.find((todo) => todo.id === id)
    if (!todo) {
      return
    }
    if (user.value && todo.onlineMode) {
      await $fetch('/api/todos/title', {
        method: 'PATCH',
        body: {
          id,
          title: newTitle
        }
      })
    }
    todo.title = newTitle
  }

  async function removeTodo(id: string) {
    const todo = todos.value.find((todo) => todo.id === id)
    if (!todo) {
      return
    }
    if (user.value && todo.onlineMode) {
      await $fetch('/api/todos', {
        method: 'DELETE',
        body: { id }
      })
    }
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  function getTodo(todoListId: string) {
    const todo = todos.value.find((todo) => todo.id === todoListId)
    if (!todo) {
      throw new Error('Todo not found')
    }
    const addItem = async (title: string) => {
      if (user.value && todo.onlineMode) {
        const { data } = await $fetch('/api/todos/items', {
          method: 'POST',
          body: {
            todoListId,
            title
          }
        })
        todo.items.push({
          id: data.id,
          title: data.title,
          done: data.done
        })
      } else {
        todo.items.push({
          id: uuid(),
          title,
          done: false
        })
      }
    }
    const updateItemTitle = async (id: string, newTitle: string) => {
      if (user.value && todo.onlineMode) {
        await $fetch('/api/todos/items/title', {
          method: 'PATCH',
          body: {
            todoListItemId: id,
            title: newTitle
          }
        })
      }
      const item = todo.items.find((item) => item.id === id)
      if (item) {
        item.title = newTitle
      }
    }
    const markItemDone = async (id: string) => {
      const item = todo.items.find((item) => item.id === id)
      if (!item) {
        return
      }
      if (user.value && todo.onlineMode) {
        await $fetch('/api/todos/items/done', {
          method: 'PATCH',
          body: {
            todoListItemId: id,
            done: true
          }
        })
      }
      item.done = true
    }
    const markItemUndone = (id: string) => {
      const item = todo.items.find((item) => item.id === id)
      if (!item) {
        return
      }
      if (user.value && todo.onlineMode) {
        $fetch('/api/todos/items/done', {
          method: 'PATCH',
          body: {
            todoListItemId: id,
            done: false
          }
        })
      }
      item.done = false
    }
    const removeItem = async (id: string) => {
      const item = todo.items.find((item) => item.id === id)
      if (!item) {
        return
      }
      if (user.value && todo.onlineMode) {
        await $fetch('/api/todos/items', {
          method: 'DELETE',
          body: {
            todoListItemId: id
          }
        })
      }
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
    clearTodoListOnline,
    syncTodo
  }
}
