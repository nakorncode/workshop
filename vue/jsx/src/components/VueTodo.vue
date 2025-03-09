<script setup lang="ts">
import { ref, defineEmits, defineProps, watchEffect } from 'vue'
import { type TodoItem } from '../types'

const props = defineProps<{
  todoList: TodoItem[]
}>()
const emit = defineEmits<{
  'update:todoList': [data: TodoItem[]]
  'allFinished': []
}>()

const todoList = ref(props.todoList)
const newTodo = ref('')

function onAddTodoItem() {
  if (newTodo.value.trim()) {
    todoList.value.push({ text: newTodo.value.trim(), done: false })
    newTodo.value = ''
    emit('update:todoList', todoList.value)
  }
}

function toggleStatusTodoItem(index: number) {
  todoList.value[index].done = !todoList.value[index].done
  emit('update:todoList', todoList.value)
}

function deleteTodoItem(index: number) {
  todoList.value.splice(index, 1)
  emit('update:todoList', todoList.value)
}

watchEffect(() => {
  if (todoList.value.every(item => item.done)) {
    emit('allFinished')
  }
})
</script>

<template>
  <ul class="list-disc pl-6 mb-3 space-y-1">
    <li v-for="(item, index) in todoList" :key="index">
      <div class="flex items-center gap-2">
        <button
          type="button"
          :class="['btn-sm', item.done ? '!bg-green-100' : '!bg-red-100']"
          @click="toggleStatusTodoItem(index)"
        >
          {{ item.done ? '✅' : '❌' }}
        </button>
        <span>{{ item.text }}</span>
        <button class="btn-sm" type="button" @click="deleteTodoItem(index)">Remove</button>
      </div>
    </li>
    <p v-if="todoList.length === 0" class="text-gray-500 italic">No todo found</p>
  </ul>
  <form @submit.prevent="onAddTodoItem" class="flex gap-2">
    <input type="text" v-model="newTodo" placeholder="Please enter a todo" />
    <button type="submit">Add</button>
  </form>
</template>
