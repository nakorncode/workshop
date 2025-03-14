<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '../lib/useAuth'
import { useCart } from '../lib/useCart'

const auth = useAuth()
const cart = useCart()

const credentialInput = ref({
  username: '',
  password: ''
})

onMounted(auth.getSession)

function onLogin() {
  try {
    auth.login(credentialInput.value.username, credentialInput.value.password)
  } catch (error) {
    alert(error?.message || 'Unknown error')
  }
}
</script>

<template>
  <nav class="bg-gray-100 p-4 rounded-lg shadow-md">
    <div class="container">
      <ul class="flex items-center gap-1">
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>

        <li class="ml-auto pr-3 border-r-2 border-gray-300 mr-3"><a href="/cart">Cart ({{ cart.carts.value.length }})</a></li>

        <li v-if="!auth.user.value">
          <form @submit.prevent="onLogin" class="flex gap-2">
            <input type="text" placeholder="Username" v-model="credentialInput.username">
            <input type="password" placeholder="Password" v-model="credentialInput.password">
            <button type="submit" class="cursor-pointer">Login</button>
          </form>
        </li>
        <li v-else><button type="button" @click="auth.logout" class="cursor-pointer">Logout</button></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
@reference "tailwindcss";

li a, li button {
  @apply inline-block px-4 py-2 bg-gray-200 rounded-md;
}

input {
  @apply bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500;
}
</style>
