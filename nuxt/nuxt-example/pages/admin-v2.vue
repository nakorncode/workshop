<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'only-admin'
})
</script>

<template>
  <nav style="color: red;">
    Admin Panel (V2)
  </nav>

  <main>
    <NuxtPage/>
  </main>
</template>