<script setup lang="ts">
const input = ref({
  email: '',
  password: ''
})

const { login } = useUser()
const toast = useToast()

async function onLogin() {
  try {
    const data = await login(input.value.email, input.value.password)
    toast.add({ title: `Login successful on email ${data.user.email}`, color: 'success' })
    await navigateTo('/')
  } catch (error) {
    toast.add({ title: (error as Error)?.message || 'Unknown error', color: 'error' })
    return
  }
}
</script>

<template>
  <div class="max-w-xs mx-auto">
    <h1 class="font-bold text-2xl mb-4">Login</h1>
    <form @submit.prevent="onLogin">
      <div class="flex flex-col gap-1">
        <UFormField label="Email">
          <UInput v-model="input.email" name="email" class="w-full" placeholder="Email" type="email"/>
        </UFormField>
        <UFormField label="Password">
          <UInput v-model="input.password" name="password" class="w-full" placeholder="Password" type="password"/>
        </UFormField>
        <div class="mt-3">
          <UButton type="submit" block>Submit</UButton>
        </div>
      </div>
    </form>
  </div>
</template>
