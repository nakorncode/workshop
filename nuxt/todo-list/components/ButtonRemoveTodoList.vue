<script setup lang="ts">
const { removeTodo } = useTodo()

const props = defineProps<{
  todo: TodoList
}>()

const open = ref(false)
</script>

<template>
  <UModal v-model:open="open" :ui="{ content: 'max-w-sm' }">
    <UButton color="error" size="xs">Delete</UButton>
    <template #content>
      <div class="p-4">
        <h2 class="font-bold mb-1">Are you sure to delete this todo list?</h2>
        <p class="mb-3">Todo: "{{ props.todo.title }}"</p>
        <div class="flex justify-end gap-1">
          <UButton color="error" @click="removeTodo(props.todo.id)">Confirm</UButton>
          <UButton color="secondary" @click="open = false">Cancel</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
