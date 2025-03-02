<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

interface ProductItem {
  name: string
  price: number
  isActive: boolean
}

const firstInput = useTemplateRef('productName')
const products = ref<ProductItem[]>([])
const input = ref<ProductItem>({
  name: '',
  price: 0,
  isActive: true
})

function onSubmit() {
  if (!input.value.name || !input.value.price) {
    return
  }
  products.value.push({ ...input.value }) // ทำเพื่อป้องกัน Reference
  resetField()
}

function resetField() {
  input.value.name = ''
  input.value.price = 0
  input.value.isActive = true
  firstInput.value?.focus() // ref จะช่วยให้เรียกใช้งาน DOM ต่างๆง่ายขึ้น
}
</script>

<template>
  <h1>Template Refs</h1>
  <form @submit.prevent="onSubmit">
    <label>
      <span>Product Name:</span>
      <input ref="productName" v-model.trim="input.name" type="text">
    </label>
    <label>
      <span>Product Price:</span>
      <input v-model.number="input.price" type="number">
    </label>
    <label>
      <span>Product Active:</span>
      <input v-model="input.isActive" type="checkbox">
    </label>
    <button type="submit">Submit</button>
  </form>

  <hr>

  <table border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Active</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.name">
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.isActive }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
label {
  display: block;
}
</style>
