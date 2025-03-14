<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  bgColor: string
  textColor: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:bgColor': [value: string]
  'update:textColor': [value: string]
}>()
</script>

<template>
  <div class="flex gap-2">
    <input
      type="text"
      class="input"
      :value="props.modelValue"
      @input="$event => emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    <input
      type="color"
      class="w-12 h-12"
      :value="props.bgColor"
      @input="$event => emit('update:bgColor', ($event.target as HTMLInputElement).value)">
    <input
      type="color"
      class="w-12 h-12"
      :value="props.textColor"
      @input="$event => emit('update:textColor', ($event.target as HTMLInputElement).value)">
  </div>
</template>
