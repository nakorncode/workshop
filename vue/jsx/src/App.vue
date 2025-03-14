<script setup lang="ts">
import { ref } from 'vue'
import { JSXTodo } from './components/JSXTodo'
import { TodoItem } from './types'
import VueTodo from './components/VueTodo.vue'
import HTodo from './components/HTodo.vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

const toast = useToast({
  position: 'top',
  duration: 5000
})

const todoList = ref<TodoItem[]>([
  { text: 'Learn JavaScript', done: false },
  { text: 'Learn TypeScript', done: false },
  { text: 'Learn Vue', done: false }
])

function onAllFinished(callOn: string) {
  toast.success(`All finished (${callOn})`)
}
</script>

<template>
  <div class="p-4 max-w-sm">
    <h2>Vue</h2>
    <VueTodo v-model:todo-list="todoList" @all-finished="onAllFinished('Vue')"></VueTodo>

    <hr>

    <h2>Vue Render Function <code>h()</code></h2>
    <HTodo v-model:todo-list="todoList" @all-finished="onAllFinished('h()')"></HTodo>

    <hr>

    <!-- ⚠️ JSX ไม่สามารถแปลง Prop Casing ได้ จึงต้องใช้ camelCase เป็นหลัก -->
    <h2>JSX</h2>
    <JSXTodo v-model:todoList="todoList" @allFinished="onAllFinished('JSX')"></JSXTodo>
  </div>
</template>
