<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Product {
  id: number
  name: string
  price: number
}

const input = ref({ name: '', price: 0 })
const products = ref<Product[]>([])

const backendUrl = '/api/products'

async function fetchProducts() {
  const { data } = await fetch(backendUrl).then(res => res.json()) as { data: Product[] }
  products.value = data
}

async function createProduct(name: string, price: number) {
  await fetch(backendUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, price })
  })
  await fetchProducts()
}

async function onSubmitCreateProduct() {
  await createProduct(input.value.name, input.value.price)
  input.value = { name: '', price: 0 }
}

onMounted(fetchProducts)
</script>

<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product of products">
        {{ product.name }} (ราคา {{ product.price }} บาท)
      </li>
    </ul>
    
    <hr>

    <h2>Create Product</h2>
    <form @submit.prevent="onSubmitCreateProduct">
      <div>
        <label for="name">Name</label> <input type="text" id="name" v-model="input.name">
      </div>
      <div>
        <label for="price">Price</label> <input type="number" id="price" v-model.number="input.price">
      </div>
      <div>
        <button>Create</button>
      </div>
    </form>
  </div>
</template>