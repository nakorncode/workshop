<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="max-w-md p-4 rounded shadow-lg mx-auto mt-8">
    <h1 class="text-xl font-bold mb-2">Error ({{ props.error?.statusCode }})</h1>
    <p>{{ props.error?.statusMessage }}</p>
    <NuxtLink to="/" class="btn mt-6">Back to Homepage</NuxtLink>
  </div>
</template>
