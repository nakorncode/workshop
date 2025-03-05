<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { debounce } from 'lodash-es'
import { watchDebounced } from '@vueuse/core'

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

watch(userId, debounce(fetchUser, 500))

// watchEffect
const productId = ref<number | null>(null)
const productLoading = ref(false)
const product = ref<null | {
  id: number
  title: string
  price: number
  stock: number
}>(null)

async function fetchProduct() {
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
}

watchEffect(fetchProduct) // อาจจะใช้ร่วมกับ debounce ไม่ได้

// watchDebounced
const postId = ref<number | null>(null)
const post = ref<null | {
  id: number
  title: string
  body: string
}>(null)
const postLoading = ref(false)

async function fetchPost() {
  if (!postId.value) {
    return
  }
  postLoading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/posts/${postId.value}?select=id,title,body`)
    if (res.status >= 400) {
      throw new Error('Failed to fetch post')
    }
    const data = await res.json()
    post.value = data
  } catch (error) {
    alert(error?.message || 'Unknown error')
  }
  postLoading.value = false
}

watchDebounced(postId, fetchPost, { debounce: 500 })
</script>

<template>
  <div class="max-w-md p-4">
    <h2>watch()</h2>
    <p><b>Current User ID:</b> {{ userId }}</p>
    <label for="userId">User ID:</label>
    <input v-model="userId" id="userId" type="number" placeholder="Please enter a user ID">
    <p v-if="userLoading">Loading...</p>
    <p v-else-if="user"><b>Name:</b> {{ user.firstName }} {{ user.lastName }}, <b>Age:</b> {{ user.age }}</p>
    <p v-else>No user</p>

    <hr>

    <h2>watchEffect()</h2>
    <p><b>Current Product ID:</b> {{ productId }}</p>
    <label for="productId">Product ID:</label>
    <input v-model="productId" id="productId" type="number" placeholder="Please enter a product ID">
    <p v-if="productLoading">Loading...</p>
    <p v-else-if="product"><b>Title:</b> {{ product.title }}, <b>Price:</b> {{ product.price }}, <b>Stock:</b> {{ product.stock }}</p>
    <p v-else>No product</p>

    <hr>

    <h2>watchDebounced()</h2>
    <p><b>Current Post ID:</b> {{ postId }}</p>
    <label for="postId">Post ID:</label>
    <input v-model="postId" id="postId" type="number" placeholder="Please enter a post ID">
    <p v-if="postLoading">Loading...</p>
    <p v-else-if="post"><b>Title:</b> {{ post.title }}<br><b>Body:</b> {{ post.body }}</p>
    <p v-else>No post</p>
  </div>
</template>
