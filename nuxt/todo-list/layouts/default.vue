<script setup lang="ts">
const { user, logout } = useUser()

const toast = useToast()
const { start, finish } = useLoadingIndicator()
const logoutLoading = ref(false)

async function onLogout() {
  logoutLoading.value = true
  start()
  try {
    await logout()
    toast.add({ title: 'Logout successful', color: 'success' })
    await navigateTo('/')
  } catch (error) {
    console.error(error)
  }
  finish()
  logoutLoading.value = false
}
</script>

<template>
  <div class="p-3 text-gray-700">
    <nav>
      <div class="max-w-md mx-auto bg-gray-100 p-2 rounded-md shadow">
        <ul class="flex items-center gap-2">
          <li><NuxtLink class="font-bold text-lg text-blue-600 underline" to="/">Todo List</NuxtLink></li>
          <template v-if="!user">
            <li class="ml-auto"><NuxtLink to="/login" class="text-blue-600 underline">Login</NuxtLink></li>
            <li><NuxtLink to="/sign-up" class="text-white bg-blue-600 px-2 py-1 rounded-md hover:bg-blue-800">Sign Up</NuxtLink></li>
          </template>
          <template v-else>
            <li class="ml-auto"><span>{{ user.email }}</span></li>
            <li><UButton :loading="logoutLoading" @click="onLogout">Logout</UButton></li>
          </template>
        </ul>
      </div>
    </nav>

    <main class="mt-4">
      <div class="max-w-md mx-auto">
        <slot/>
      </div>
    </main>
  </div>
</template>
