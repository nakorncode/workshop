<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface TodoItem {
  text: string
  done: boolean
}

// 📝 คล้ายกับ defineProps() ดังนั้นแนะนำวิธีนี้ และไม่ควรใช้ $emit บน <template> เพื่อป้องกันความสับสน
const emit = defineEmits<{
  init: [],
  created: [item: TodoItem],
  statusUpdated: [from: TodoItem, to: TodoItem],
  deleted: [item: TodoItem, key: number]
}>()

const todos = ref<TodoItem[]>([])

async function getTodos() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  todos.value = [
    { text: 'Learn JavaScript', done: false },
    { text: 'Learn TypeScript', done: false },
    { text: 'Learn Vue', done: false }
  ]
  emit('init')
}

function toggleStatus(key: number) {
  const todo = todos.value[key]
  const previousTodo = { ...todo }
  todo.done = !todo.done
  const currentTodo = { ...todo }
  emit('statusUpdated', previousTodo, currentTodo)
}

function deleteTodo(key: number) {
  const todo = todos.value[key]
  todos.value.splice(key, 1)
  emit('deleted', todo, key)
}

const todoInput = ref('')
function addTodo() {
  const todo = { text: todoInput.value, done: false }
  todos.value.push(todo)
  todoInput.value = ''
  emit('created', todo)
}

onMounted(getTodos)
</script>

<template>
  <ul class="list-disc pl-6 space-y-1">
    <li v-for="(todo, key) in todos" :key="key">
      <div class="flex gap-1 items-center">
        <button
          type="button"
          @click="toggleStatus(key)"
          class="text-sm px-2 py-1 rounded-md cursor-pointer"
          :class="{ 'bg-green-100': todo.done, 'bg-red-100': !todo.done }"
        >{{ todo.done ? '✅' : '❌' }}</button>
        <span>{{ todo.text }}</span>
        <button type="button" @click="deleteTodo(key)" class="text-xs inline-block py-1 px-2 bg-gray-200 text-gray-700 rounded cursor-pointer">Delete</button>
      </div>
    </li>
  </ul>
  <form @submit.prevent="addTodo" class="flex gap-1 max-w-sm">
    <input type="text" v-model="todoInput" class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Write your todo...">
    <button class="bg-blue-600 text-white py-2 px-4 inline-block rounded-md cursor-pointer shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-700">Add</button>
  </form>
</template>
