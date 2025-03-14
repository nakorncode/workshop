<script setup lang="ts">
import { useCart } from '../lib/useCart'

const cart = useCart()
</script>

<template>
  <div class="max-w-lg p-4 rounded-md shadow-md bg-gray-100">
    <ul class="flex flex-col gap-2">
      <li v-for="cartItem in cart.carts.value" :key="cartItem.id" class="p-3 border border-gray-200 rounded bg-white shadow flex justify-between">
        <p>{{ cartItem.name }} x {{ cartItem.quantity }} = {{ cartItem.price * cartItem.quantity }} Baht</p>
        <button type="button" @click="cart.remove(cartItem.id)" class="btn-sm">Remove</button>
      </li>
    </ul>
  </div>
</template>
