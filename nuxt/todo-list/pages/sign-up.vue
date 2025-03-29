<script setup lang="ts">
const input = ref({
  name: '',
  email: '',
  password: ''
})

const { signUp } = useUser()
const { start, finish } = useLoadingIndicator()
const toast = useToast()
const loading = ref(false)

async function onSignUp() {
  loading.value = true
  start()
  try {
    const data = await signUp(input.value.name, input.value.email, input.value.password)
    toast.add({ title: `Sign up successful. You can now login with ${data.user.email}`, color: 'success' })
    await navigateTo('/login')
  } catch (error) {
    toast.add({ title: (error as Error)?.message || 'Unknown error', color: 'error' })
  }
  finish()
  loading.value = false
}
</script>

<template>
  <div class="max-w-xs mx-auto">
    <h1 class="font-bold text-2xl mb-4">Sign Up</h1>
    <form @submit.prevent="onSignUp">
      <div class="flex flex-col gap-1">
        <UFormField label="Full Name">
          <UInput v-model="input.name" name="full_name" class="w-full" placeholder="Full Name"/>
        </UFormField>
        <UFormField label="Email">
          <UInput v-model="input.email" name="email" class="w-full" placeholder="Email" type="email"/>
        </UFormField>
        <UFormField label="Password">
          <UInput v-model="input.password" name="password" class="w-full" placeholder="Password" type="password"/>
        </UFormField>
        <div class="mt-3">
          <UButton type="submit" block :loading="loading">Submit</UButton>
        </div>
      </div>
    </form>
  </div>
</template>
