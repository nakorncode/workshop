<script setup lang="ts">
const { todos, updateTodoTitle, removeTodo } = useTodo()

function onTodoTitleUpdated(id: string, newTitle: string) {
  updateTodoTitle(id, newTitle)
}

function onDeleteConfirmed(id: string) {
  removeTodo(id)
}
</script>

<template>
  <ClientOnly>
    <div>
      <ul v-if="todos.length > 0" class="flex flex-col gap-6">
        <li v-for="todo in todos" :key="todo.id" class="border border-gray-300 p-2 rounded-md">
          <header class="flex justify-between">
            <span class="font-bold">{{ todo.title }}</span>
            <div class="flex gap-0.5">
              <ModalUpdateTitle
                header-title="Update Todo List Title"
                :previous-title="todo.title"
                placeholder="Enter a title of the todo list"
                @updated="onTodoTitleUpdated(todo.id, $event)"
              >
                <UButton color="secondary" size="xs">Update Title</UButton>
              </ModalUpdateTitle>
              <ModalConfirm
                title="Are you sure you want to delete this todo list?"
                :description="`Todo title: ${todo.title}`"
                confirm-color="error"
                @confirmed="onDeleteConfirmed(todo.id)"
              >
                <UButton color="error" size="xs">Delete</UButton>
              </ModalConfirm>
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

      <p v-else class="italic text-gray-500">No todo found</p>

      <div class="bg-gray-100 p-4 rounded mt-6">
        <h2 class="font-bold text-lg mb-2">Create Todo List</h2>
        <FormCreateTodoList/>
      </div>

      <DevOnly>
        <pre>{{ todos }}</pre>
      </DevOnly>
    </div>
  </ClientOnly>
</template>
