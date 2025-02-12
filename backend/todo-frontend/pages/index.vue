<script setup lang="ts">
const auth = useAuth()

const session = auth.useSession()
if (!session.value.data) {
  navigateTo('/login')
}
</script>

<template>
  <h1 class="">Home</h1>
</template>
