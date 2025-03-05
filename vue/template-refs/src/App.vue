<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'

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
const inputValid = ref(false)

watch(input, (value) => {
  inputValid.value = value.name !== '' && value.price > 0
}, { deep: true })

function onSubmit() {
  if (!inputValid.value) {
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
  <div class="max-w-md p-4">
    <h1>Template Refs</h1>
    <form @submit.prevent="onSubmit" class="space-y-2">
      <label>
        <span>Product Name:</span>
        <input ref="productName" v-model.trim="input.name" type="text">
      </label>
      <label>
        <span>Product Price:</span>
        <input v-model.number="input.price" type="number" step="0.01">
      </label>
      <label>
        <span class="mr-2">Product Active:</span>
        <input v-model="input.isActive" type="checkbox">
      </label>
      <button :disabled="!inputValid" type="submit">Submit</button>
    </form>

    <hr>

    <div class="prose">
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
    </div>
  </div>
</template>

<style scoped>
label {
  display: block;
}
</style>
