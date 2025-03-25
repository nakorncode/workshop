<script setup lang="ts">
const { user, login } = useUser()

const input = ref({
  email: '',
  password: ''
})

if (user.value) {
  await navigateTo('/')
}

const router = useRouter()

async function onLogin() {
  await login(input.value)
  router.push('/')
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="onLogin">
      <input type="email" v-model="input.email" placeholder="Email" />
      <input type="password" v-model="input.password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>