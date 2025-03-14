<script setup lang="ts">
import { ref } from 'vue'
import { TodoItem } from '../types/todo'

const todoText = ref('')

const emit = defineEmits<{
  'created': [item: TodoItem]
}>()

function addTodo() {
  emit('created', { title: todoText.value, done: false })
  todoText.value = ''
}
</script>

<template>
  <form @submit.prevent="addTodo" class="flex gap-1" data-testid="create-todo">
    <input data-testid="create-todo-input" type="text" placeholder="Please enter a todo" v-model="todoText">
    <button type="submit" data-testid="create-todo-button">Add</button>
  </form>
</template>

<style scoped>
@reference "tailwindcss";

input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5;
}

button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer;
}
</style>
