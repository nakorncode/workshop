<script setup lang="ts">
import { type ProductItem, useCart } from '../lib/useCart'

const products: Omit<ProductItem, 'quantity'>[] = [
  { id: 1, name: 'Vue for Beginner', price: 390 },
  { id: 2, name: 'Vue for Intermediate', price: 490 },
  { id: 3, name: 'Vue for Advanced', price: 650 },
  { id: 4, name: 'Nuxt for Beginner', price: 390 },
  { id: 5, name: 'Nuxt for Intermediate', price: 490 },
  { id: 6, name: 'Nuxt for Advanced', price: 650 },
]

const cart = useCart()
</script>

<template>
  <ul class="max-w-md grid grid-cols-2 gap-2">
    <li v-for="product in products" :key="product.id" class="p-3 border border-gray-300 rounded-md">
      <div>
        <h3 class="font-bold text-lg">{{ product.name }}</h3>
        <p class="text-sm mt-1 mb-2">Price: {{ product.price }} Baht</p>
        <button type="button" @click="cart.add({ ...product, quantity: 1 })" class="btn-sm">Add to cart</button>
      </div>
    </li>
  </ul>
</template>
