<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  color?: 'black' | 'gray' | 'blue' | 'red' | 'amber'
  disabled?: boolean
  loading?: boolean
}>(), {
  size: 'md',
  color: 'black',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: []
}>()

function getBackgroundColor(color: string): string[] {
  switch (color) {
    case 'gray':
      return ['bg-gray-700', 'hover:bg-gray-800']
    case 'blue':
      return ['bg-blue-700', 'hover:bg-blue-800']
    case 'red':
      return ['bg-red-700', 'hover:bg-red-800']
    case 'amber':
      return ['bg-amber-700', 'hover:bg-amber-800']
    case 'black':
    default:
      return ['bg-black', 'hover:bg-gray-800']
  }
}

function getSize(size: string): string[] {
  switch (size) {
    case 'sm':
      return ['text-sm', 'px-3', 'py-1']
    case 'lg':
      return ['text-lg', 'px-5', 'py-2']
    case 'md':
    default:
      return ['text-base', 'px-4', 'py-1.5']
  }
}

type IClasses = (Record<string, string> | string)[]

const btnClasses = computed<IClasses>(() => {
  const classes: IClasses = []
  classes.push(...getBackgroundColor(props.color))
  classes.push(...getSize(props.size))
  if (props.loading || props.disabled) classes.push('opacity-50 pointer-events-none')
  return classes
})
</script>

<template>
  <button
    class="font-bold text-white rounded-md cursor-pointer"
    :class="btnClasses"
    :disabled="props.disabled || props.loading"
    @click="emit('click')"
  >
    <slot v-if="!props.loading">Button</slot>
    <span v-else>Loading...</span>
  </button>
</template>
