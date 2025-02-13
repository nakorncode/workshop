<script setup lang="ts">
const props = defineProps<{
  todoId: string
}>()

const emit = defineEmits<{
  (e: 'created'): void
}>()

const title = ref('')
const fetch = useFetchBackend()

async function onSubmit(event: Event) {
  try {
    await fetch(`/todos/${props.todoId}/items`, {
      method: 'post',
      body: { title: title.value }
    })
    title.value = ''
    emit('created')
  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <form class="flex gap-2" @submit.prevent="onSubmit">
    <input v-model="title" type="text" class="input w-full" id="title" name="title" placeholder="Please enter a title" required />
    <button type="submit" class="btn btn-primary text-nowrap">Create Todo</button>
  </form>
</template>
