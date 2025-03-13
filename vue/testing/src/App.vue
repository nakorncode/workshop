<script setup lang="ts">
import { ref } from 'vue'
import MyButton from './components/MyButton.vue';
import TodoList, { type TodoItem } from './components/TodoList.vue'
import CreateTodo from './components/CreateTodo.vue'

function onClick() {
  alert('Clicked!')
}

const todoList = ref<TodoItem[]>([
  { title: 'Learn JavaScript', done: false },
  { title: 'Learn TypeScript', done: false },
  { title: 'Learn Vue', done: false }
])

function onAllDone() {
  alert('All done!')
}
</script>

<template>
  <div class="max-w-md p-4">
    <h2>MyButton.vue</h2>

    <div class="flex flex-wrap items-center gap-1">
      <MyButton></MyButton>
      <MyButton size="sm">sm</MyButton>
      <MyButton size="md">md</MyButton>
      <MyButton size="lg">lg</MyButton>
      <MyButton color="amber">amber</MyButton>
      <MyButton color="blue">blue</MyButton>
      <MyButton color="red">red</MyButton>
      <MyButton color="gray">gray</MyButton>
      <MyButton color="black">black</MyButton>
      <MyButton disabled>disabled</MyButton>
      <MyButton loading>loading</MyButton>
      <MyButton @click="onClick">v-on:click</MyButton>
    </div>

    <hr>

    <h2>TodoList.vue</h2>
    <TodoList v-model="todoList" @finished="onAllDone"></TodoList>

    <hr>

    <h2>CreateTodo.vue</h2>
    <CreateTodo @created="todoList.push($event)"></CreateTodo>
  </div>
</template>
