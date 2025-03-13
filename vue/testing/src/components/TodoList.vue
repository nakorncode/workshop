<script setup lang="ts">
import { type TodoItem } from '../types/todo'

const todoList = defineModel<TodoItem[]>({ required: true })

const emit = defineEmits<{
  'finished': []
}>()

function markAllAsDone() {
  if (todoList.value.every(item => item.done)) return
  for (const todo of todoList.value) {
    todo.done = true
  }
  emit('finished')
}

function toggleStatusTodoItem(index: number) {
  todoList.value[index].done = !todoList.value[index].done
  if (todoList.value.every(item => item.done)) {
    emit('finished')
  }
}
</script>

<template>
  <div class="space-y-4">
    <ul data-testid="todo-list" class="flex flex-col gap-1">
      <li data-testid="todo-item" v-for="(todo, key) in todoList" :key="key" class="flex gap-1 border border-gray-300 p-2 rounded">
        <span class="cursor-pointer" @click="toggleStatusTodoItem(key)">{{ todo.done ? '✅' : '❌' }}</span>
        <span :class="{ 'line-through': todo.done }">{{ todo.title }}</span>
      </li>
    </ul>

    <button type="button" @click="markAllAsDone">Mark all as done</button>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer;
}
</style>
