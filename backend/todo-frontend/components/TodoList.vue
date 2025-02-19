<script setup lang="ts">
const fetch = useFetchBackend()

const todos = ref<{
  id: string
  items: { id: string; title: string; done: boolean }[]
  userId: string
  user: { id: string; name: string; email: string }
  title: string
  description: string | null
  done: boolean
  isArchived: boolean
  createdAt: string
  updatedAt: string
}[] | null>(null)

async function fetchTodos() {
  try {
    const res = await fetch('/todos')
    todos.value = res.data
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Backend not running on ${useRuntimeConfig().public.apiUrl}`
    })
  }
}

await fetchTodos()

async function changeStatusItem(todoId: string, todoItemId: string, done: boolean) {
  try {
    await fetch(`/todos/${todoId}/items/${todoItemId}/done`, {
      method: 'patch',
      body: { done }
    })
    await fetchTodos()
  } catch (error) {
    alert((error as Error).message)
  }
}

async function archiveTodo(todoId: string) {
  try {
    await fetch(`/todos/${todoId}`, {
      method: 'delete'
    })
    await fetchTodos()
  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <div v-if="!todos || todos.length === 0">
    <p>No todo found</p>
  </div>
  <ul v-else class="space-y-4">
    <li v-for="(todo, i) of todos" :key="i" class="p-4 rounded-md border border-gray-300 relative">
      <h3 class="text-xl font-bold" :class="{ 'line-through': todo.done }">Todo List: {{ todo.title }}</h3>
      <button @click="() => archiveTodo(todo.id)" type="button" class="absolute top-4 right-4 text-sm inline-block py-1 px-2 bg-red-600 text-white rounded cursor-pointer">Archive</button>
      <p v-if="todo.description">{{ todo.description }}</p>
      <div class="mt-3">
        <p v-if="todo.items.length === 0" class="italic text-gray-600">No items</p>
        <ul class="list-disc pl-6 space-y-2 mb-5">
          <li v-for="(item, j) of todo.items" :key="j">
            <button v-if="!item.done" @click="() => changeStatusItem(todo.id, item.id, true)" type="button" class="text-sm inline-block py-1 px-2 bg-green-600 text-white rounded cursor-pointer">Make Done</button>
            <button v-else @click="() => changeStatusItem(todo.id, item.id, false)" type="button" class="text-sm inline-block py-1 px-2 bg-gray-600 text-white rounded cursor-pointer">Make Undone</button>
            <p class="inline-block ml-1" :class="{ 'line-through': item.done }">{{ item.title }}</p>
          </li>
        </ul>
      </div>
      <div class="mt-3">
        <CreateTodoListItem :todo-id="todo.id" @created="fetchTodos"></CreateTodoListItem>
      </div>
    </li>
  </ul>
  <div class="mt-6 border border-gray-200 shadow-md p-6 rounded-md">
    <CreateTodoList @created="fetchTodos"></CreateTodoList>
  </div>
</template>
