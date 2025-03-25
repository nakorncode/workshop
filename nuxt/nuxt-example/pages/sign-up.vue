<script setup lang="ts">
const input = ref({
  name: '',
  email: '',
  password: ''
})

const router = useRouter()

async function onSignUp() {
  try {
    await $fetch('/api/sign-up', {
      method: 'POST',
      body: input.value
    })
    alert('Sign up successful!')
    router.push('/login')
  } catch (error) {
    alert('Sign up failed!')
  }
}
</script>

<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="onSignUp">
      <input type="text" v-model="input.name" placeholder="Username" />
      <input type="email" v-model="input.email" placeholder="Email" />
      <input type="password" v-model="input.password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>