<script setup lang="ts">
const title = ref('')

const emit = defineEmits<{
  'created': [value: string]
}>()

function onSubmit() {
  emit('created', title.value)
  title.value = ''
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex gap-1">
      <UInput v-model="title" class="w-full" placeholder="Enter a title of the todo list"/>
      <UButton type="submit">Submit</UButton>
    </div>
  </form>
</template>
