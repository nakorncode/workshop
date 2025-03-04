<script setup lang="ts">
import { actions } from 'astro:actions'
import { ref } from 'vue'

const input = ref({
  title: '',
  description: '',
  price: 0
})

async function onSubmit() {
  const { data, error } = await actions.createProduct(input.value)
  if (error) {
    alert(error.message)
    return
  }
  alert(`Product created on id ${data?.id}`)
  input.value.title = ''
  input.value.description = ''
  input.value.price = 0
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label>
      Title
      <input v-model="input.title" type="text" required>
    </label>

    <label>
      Description
      <input v-model="input.description" type="text" required>
    </label>

    <label>
      Price
      <input v-model.number="input.price" type="number" min="0" required>
    </label>

    <button type="submit">Create</button>
  </form>
</template>

<style scoped>
  label {
    display: block;
  }
</style>
