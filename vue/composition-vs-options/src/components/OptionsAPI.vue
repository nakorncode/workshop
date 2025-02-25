<template>
  <div>
    <h1>Options API</h1>
    <p>Counter: {{ counter }}</p>
    <p>Double: {{ doubleCounter }}</p>
    <button @click="increment">Increment</button>
    <input v-model="counter" type="number" />
  </div>
</template>

<script>
export default {
  // Props
  props: {
    initialValue: {
      type: Number,
      required: true
    },
    modelValue: Number // v-model
  },
  data() {
    return {
      counter: this.initialValue
    }
  },
  computed: {
    doubleCounter() {
      return this.counter * 2
    }
  },
  watch: {
    counter(newValue, oldValue) {
      console.log(`Counter changed from ${oldValue} to ${newValue}`)
      this.$emit('update:modelValue', newValue) // Emit event
    }
  },
  mounted() {
    console.log('Component mounted (Options API)')
  },
  methods: {
    increment() {
      this.counter++
    }
  }
}
</script>
