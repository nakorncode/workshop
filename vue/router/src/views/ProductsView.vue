<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { type ProductItem } from '../types/products'

const products = ref<ProductItem[]>([])

onMounted(async () => {
  const url = 'https://dummyjson.com/products?select=id,title,price,images,reviews'
  const data = await fetch(url).then(res => res.json()) as { products: ProductItem[] }
  products.value = data.products
})
</script>

<template>
  <h1>Product List</h1>
  <p v-if="products.length === 0">Loading...</p>
  <div v-else class="grid grid-cols-2 gap-2">
    <RouterLink v-for="product in products" :key="product.id" class="border border-gray-300 rounded-md relative hover:shadow-xl transition" :to="`/products/${product.id}`">
      <p class="text-sm absolute right-2 top-2 bg-gray-800/70 text-white px-2 py-1 rounded-md">${{ product.price }}</p>
      <img :src="product.images[0] || 'https://placehold.co/200x200'" class="w-[200px] h-[200px] object-cover object-center" :alt="product.title">
      <div class="p-3">
        <h2 class="font-bold">{{ product.title }}</h2>
      </div>
    </RouterLink>
  </div>
</template>
