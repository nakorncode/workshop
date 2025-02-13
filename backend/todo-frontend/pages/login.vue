<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const notification = useNotification()
const auth = useAuth()
const { getSession } = useUser()
const router = useRouter()

const email = ref('')
const password = ref('')

async function onSubmit() {
  try {
    const res = await auth.signIn.email({
      email: email.value,
      password: password.value
    })
    if (res.error) {
      throw new Error(res.error.message)
    }
    await getSession()
    notification.setMessage('Login successful.')
    router.push('/')
  } catch (error) {
    notification.setError((error as Error).message)
  }
}
</script>

<template>
  <div class="mt-6 shadow-xl p-6 rounded-md">
    <h1 class="text-xl font-bold">Login</h1>
    <ShowNotification class="mt-4" :messages="notification.messages.value"></ShowNotification>
    <ShowNotification class="mt-4" :errors="notification.errors.value"></ShowNotification>
    <form class="mt-6" @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="email" class="block font-medium text-gray-700">Email:</label>
        <input v-model="email" type="email" id="email" name="email" class="input mt-1" required />
      </div>
      <div class="mb-4">
        <label for="password" class="block font-medium text-gray-700">Password:</label>
        <input v-model="password" type="password" id="password" name="password" class="input mt-1" required />
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
