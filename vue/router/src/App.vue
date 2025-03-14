<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-gray-200 shadow-md">
    <div class="max-w-md mx-auto">
      <ul class="flex gap-1 py-2">
        <li><RouterLink class="router-link-item" to="/">Home</RouterLink></li>
        <li><RouterLink class="router-link-item" to="/products">Products</RouterLink></li>
        <li><RouterLink class="router-link-item" to="/about">About</RouterLink></li>
      </ul>
    </div>
  </nav>

  <main class="mt-8">
    <div class="max-w-md mx-auto">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<style scoped>
@reference "tailwindcss";

.router-link-item {
  @apply inline-block px-3 py-2 rounded-md
}
.router-link-active {
  @apply bg-white
}
</style>
