<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits, defineModel, onMounted } from 'vue'

// Props
const props = defineProps<{
  initialValue: number
}>()

// Emit event
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

// v-model (defineModel for Vue 3.4+)
const model = defineModel<number>()

// State
const counter = ref(props.initialValue)

// Computed property
const doubleCounter = computed(() => counter.value * 2)

// Watcher
watch(counter, (newValue, oldValue) => {
  console.log(`Counter changed from ${oldValue} to ${newValue}`)
  emit('update:modelValue', newValue) // Emit event
})

// Lifecycle hook
onMounted(() => {
  console.log('Component mounted (Composition API)')
})

// Methods
const increment = () => {
  counter.value++
}
</script>

<template>
  <div>
    <h1>Composition API</h1>
    <p>Counter: {{ counter }}</p>
    <p>Double: {{ doubleCounter }}</p>
    <button @click="increment">Increment</button>
    <input v-model="model" type="number" />
  </div>
</template>
