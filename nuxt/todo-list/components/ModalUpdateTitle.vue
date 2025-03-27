<script setup lang="ts">
const props = defineProps<{
  headerTitle: string
  previousTitle: string
  placeholder: string
}>()

const emit = defineEmits<{
  updated: [newTitle: string]
}>()

const title = ref(props.previousTitle)
const open = ref(false)

function onUpdated() {
  emit('updated', title.value)
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    class="max-w-sm"
    :title="props.headerTitle"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full'
    }"
    :ui="{
      content: 'max-w-sm'
    }"
  >
    <slot/>
    <template #body>
      <form @submit.prevent="onUpdated">
        <div class="flex gap-1">
          <UInput v-model="title" :placeholder="props.placeholder" class="w-full"/>
          <UButton type="submit">Update</UButton>
        </div>
      </form>
    </template>
  </UModal>
</template>
