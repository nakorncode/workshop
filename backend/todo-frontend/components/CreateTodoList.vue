<script lang="ts" setup>
const fetch = useFetchBackend()

async function onSubmit(event: Event) {
  const formData = new FormData(event.target as HTMLFormElement)
  const data = Object.fromEntries(formData)
  try {
    await fetch('/todos', {
      method: 'post',
      body: data
    })
    emit('created')
  } catch (error) {
    alert((error as Error).message)
  }
}

const emit = defineEmits<{
  (e: 'created'): void
}>()
</script>

<template>
  <h2 class="mb-3 text-xl font-bold">Create New Todo</h2>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="title" class="mb-1 inline-block font-bold">Title:</label>
      <input type="text" class="input" id="title" name="title" required />
    </div>
    <div class="mb-3">
      <label for="description" class="mb-1 inline-block font-bold">Description (Optional):</label>
      <textarea class="input" id="description" name="description" rows="3"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Create Todo</button>
  </form>
</template>
