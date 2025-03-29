<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  confirmColor?: "primary" | "neutral" | "secondary" | "success" | "info" | "warning" | "error"
}>()

const emit = defineEmits<{
  confirmed: []
}>()

const open = ref(false)

function onConfirmed() {
  emit('confirmed')
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" :ui="{ content: 'max-w-sm' }">
    <slot/>
    <template #content>
      <div class="p-4">
        <h2 class="font-bold mb-1">{{ props.title }}</h2>
        <p v-if="props.description">{{ props.description }}</p>
        <div class="flex justify-end gap-1 mt-3">
          <UButton :color="confirmColor" @click="onConfirmed">Confirm</UButton>
          <UButton color="secondary" @click="open = false">Cancel</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
