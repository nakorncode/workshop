<template>
  <h2>{{ title }}</h2>
  <div>
    <p>Counter: {{ counter }}</p>
    <p>Double: {{ doubleCounter }}</p>
    <div class="flex gap-2">
      <button @click="increment">Increment</button>
      <input v-model="counter" type="number" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: {
    'counterChanged': (value: number) => true
  },
  setup(props, { emit }) {
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

    return {
      counter,
      doubleCounter,
      increment
    }
  }
})
</script>
