<script setup lang="ts">
const { getSession, user, logout } = useUser()
const notification = useNotification()

const loggedIn = await getSession()
if (!loggedIn) {
  navigateTo('/login')
}
</script>

<template>
  <div v-if="user" class="max-w-xl mx-auto">
    <h1 class="text-2xl font-bold">My Todo</h1>
    <hr class="my-4 border-gray-300">
    <ShowNotification class="my-4" :messages="notification.messages.value"></ShowNotification>
    <p>Welcome {{ user.name }}. Not your account? <button @click="logout" type="button" class="cursor-pointer underline text-blue-600">Sign Out</button></p>
    <div class="mt-6">
      <TodoList></TodoList>
    </div>
  </div>
</template>
