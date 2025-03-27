<script setup lang="ts">
const input = ref({
  name: '',
  email: '',
  password: ''
})

const toast = useToast()

async function onSignUp() {
  const { data, error } = await authClient.signUp.email({
    ...input.value
  })
  if (error) {
    toast.add({ title: error.message || 'Unknown error', color: 'error' })
    return
  }
  toast.add({ title: `Sign up successful. You can now login with ${data.user.email}`, color: 'success' })
  await navigateTo('/login')
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
          <UButton type="submit" block>Submit</UButton>
        </div>
      </div>
    </form>
  </div>
</template>
