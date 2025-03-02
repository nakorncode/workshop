<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

// watch
interface User {
  firstName: string
  lastName: string
  age: number
}

const user = ref<User | null>(null)
const userLoading = ref(false)
const userId = ref<number | null>(null)

async function fetchUser() {
  if (!userId.value) {
    return
  }
  userLoading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/users/${userId.value}?select=firstName,lastName,age`)
    if (res.status >= 400) {
      throw new Error('Failed to fetch user')
    }
    const data = await res.json() as User
    user.value = data
  } catch (error) {
    alert(error?.message || 'Unknown error')
  }
  userLoading.value = false
}

watch(userId, fetchUser)

// watchEffect
const productId = ref<number | null>(null)
const productLoading = ref(false)
const product = ref<null | {
  id: number
  title: string
  price: number
  stock: number
}>(null)

watchEffect(async () => {
  if (!productId.value) {
    return
  }
  productLoading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId.value}?select=id,title,price,stock`)
    if (res.status >= 400) {
      throw new Error('Failed to fetch product')
    }
    const data = await res.json()
    product.value = data
  } catch (error) {
    alert(error?.message || 'Unknown error')
  }
  productLoading.value = false
})
</script>

<template>
  <h2>watch()</h2>
  <p>Current User ID: {{ userId }}</p>
  <label for="userId">User ID:</label>
  <input v-model="userId" id="userId" type="number" placeholder="Please enter a user ID">

  <p v-if="userLoading">Loading...</p>
  <p v-else-if="user">Name: {{ user.firstName }} {{ user.lastName }}, Age: {{ user.age }}</p>
  <p v-else>No user</p>

  <hr>

  <h2>watchEffect()</h2>
  <p>Current Product ID: {{ productId }}</p>
  <label for="productId">Product ID:</label>
  <input v-model="productId" id="productId" type="number" placeholder="Please enter a product ID">

  <p v-if="productLoading">Loading...</p>
  <p v-else-if="product">Title: {{ product.title }}, Price: {{ product.price }}, Stock: {{ product.stock }}</p>
  <p v-else>No product</p>
</template>
