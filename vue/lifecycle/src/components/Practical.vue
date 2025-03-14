<script lang="ts" setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'
import { faker } from '@faker-js/faker'

interface User {
  firstName: string
  lastName: string
  age: number
}

// onMounted
const user = ref<User | null>(null)
const userId = ref(1)
async function fetchUser() {
  const res = await fetch(`https://dummyjson.com/users/${userId.value}?select=firstName,lastName,age`)
  if (res.status >= 400) {
    alert('Failed to fetch user')
    return
  }
  const data = await res.json() as User
  user.value = data as User
  document.title = `User: ${data.firstName} ${data.lastName}`
}
onMounted(fetchUser)

// onUpdated
const chat = ref<{ from: string; message: string }[]>([])
const chatTimer = setInterval(() => {
  chat.value.push({ from: faker.internet.username(), message: faker.lorem.word() })
}, 500)
onUpdated(() => {
  const textarea = document.querySelector('textarea') as HTMLTextAreaElement
  const isAtBottom = textarea.scrollTop + textarea.clientHeight > textarea.scrollHeight - 30
  if (isAtBottom) {
    textarea.scrollTop = textarea.scrollHeight
  }
})

// onUnmounted
onUnmounted(() => {
  clearInterval(chatTimer)
})
</script>

<template>
  <h2>Practical</h2>

  <h3>Get user from API <code>onMounted</code></h3>
  <form @submit.prevent="fetchUser">
    <label for="id">ID:</label>
    <input id="id" v-model="userId" type="number">
    <button class="mt-2">Fetch User</button>
  </form>
  <p v-if="user" class="mt-2">Name: {{ user.firstName }} {{ user.lastName }}, Age: {{ user.age }}</p>

  <hr>

  <h3>Auto-scroll when new content added but only if at the bottom <code>onUpdated</code></h3>
  <textarea cols="50" rows="10" readonly style="white-space: pre;">
{{ chat.map((c) => `${c.from}: ${c.message}`).join('\n') }}
  </textarea>
</template>
