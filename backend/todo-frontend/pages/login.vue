<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const notification = useNotification()
</script>

<template>
  <div class="mt-6 shadow-xl p-6 rounded-md">
    <h1 class="text-xl font-bold">Login</h1>
    <ShowNotification class="mt-4" :messages="notification.messages.value"></ShowNotification>
    <form class="mt-6">
      <div class="mb-4">
        <label for="email" class="block font-medium text-gray-700">Email:</label>
        <input type="email" id="email" name="email" class="input mt-1" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block font-medium text-gray-700">Password:</label>
        <input type="password" id="password" name="password" class="input mt-1" required />
      </div>
      <button type="submit" class="btn w-full mt-2">
        Login
      </button>
    </form>
    <div class="mt-4">
      <p>
        Don't have an account? <NuxtLink to="/sign-up" class="underline text-blue-600">Sign-up</NuxtLink>
      </p>
    </div>
  </div>
</template>
