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

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: {
    'counterChanged': (value) => typeof value === 'number'
  },
  data() {
    return {
      counter: 0
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
      this.$emit('counterChanged', newValue) // Emit event
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
