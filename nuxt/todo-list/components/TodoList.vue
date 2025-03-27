<script setup lang="ts">
const { todos } = useTodo()
</script>

<template>
  <div>
    <ul class="flex flex-col gap-6">
      <li v-for="todo in todos" :key="todo.id" class="border border-gray-300 p-2 rounded-md">
        <header class="flex justify-between">
          <span class="font-bold">{{ todo.title }}</span>
          <div class="flex gap-0.5">
            <ButtonUpdateTodoListTitle :todo="todo"/>
            <ButtonRemoveTodoList :todo="todo"/>
          </div>
        </header>
        <main class="mt-4">
          <TodoListItem :todo="todo"/>
          <div class="mt-4">
            <FormCreateTodoListItem :todo-id="todo.id"/>
          </div>
        </main>
      </li>
    </ul>

    <div class="bg-gray-100 p-4 rounded mt-6">
      <h2 class="font-bold text-lg mb-2">Create Todo List</h2>
      <FormCreateTodoList/>
    </div>

    <DevOnly>
      <pre>{{ todos }}</pre>
    </DevOnly>
  </div>
</template>
