<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits, defineModel, onMounted } from 'vue'

// Props
const props = defineProps<{
  title: string
}>()

// Emit event
const emit = defineEmits<{
  'counterChanged': [value: number]
}>()

// State
const counter = ref(0)

// Computed property
const doubleCounter = computed(() => counter.value * 2)

// Watcher
watch(counter, (newValue, oldValue) => {
  console.log(`Counter changed from ${oldValue} to ${newValue}`)
  emit('counterChanged', newValue) // Emit event
})

// Lifecycle hook
onMounted(() => {
  console.log('Component mounted (Composition API Setup)')
})

// Methods
const increment = () => {
  counter.value++
}
</script>

<template>
  <h1>{{ props.title }}</h1>
  <div>
    <p>Counter: {{ counter }}</p>
    <p>Double: {{ doubleCounter }}</p>
    <div>
      <button @click="increment">Increment</button>
      <input v-model="counter" type="number" />
    </div>
  </div>
</template>
