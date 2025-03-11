<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { type ProductItem } from '../types/products'

const route = useRoute()

const product = ref<ProductItem | null>(null)

onMounted(async () => {
  const data = await fetch(`https://dummyjson.com/products/${route.params.id}`).then(res => res.json()) as ProductItem
  product.value = data
})
</script>

<template>
  <h1>Product ID: {{ route.params.id }}</h1>
  <p v-if="product === null">Loading...</p>
  <div v-else>
    <img :src="product.images[0] || 'https://placehold.co/200x200'" class="w-[200px] h-[200px] object-cover object-center my-3" :alt="product.title">
    <ul class="list-disc">
      <li>Name: {{ product.title }}</li>
      <li>Price: ${{ product.price }}</li>
    </ul>
  </div>
</template>
