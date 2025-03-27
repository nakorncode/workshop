<script setup lang="ts">
const { todos } = useTodo()
</script>

<template>
  <div>
    <ul class="flex flex-col gap-2">
      <li v-for="todo in todos" :key="todo.id" class="border border-gray-300 p-2 rounded-md flex justify-between">
        <span>{{ todo.title }}</span>
        <div class="flex gap-0.5">
          <ButtonUpdateTodoListTitle :todo="todo"/>
          <ButtonRemoveTodoList :todo="todo"/>
        </div>
      </li>
    </ul>

    <div class="bg-gray-100 p-4 rounded mt-4">
      <h2 class="font-bold text-lg mb-2">Create Todo List</h2>
      <FormCreateTodoList/>
    </div>
  </div>
</template>
