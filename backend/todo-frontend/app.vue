<script setup lang="ts">
import './assets/styles.css'

useSeoMeta({
  title: 'My Todo'
})

const runtimeConfig = useRuntimeConfig()
const fetch = useFetchBackend()

try {
  await fetch('/ok')
} catch (error) {
  throw createError({
    statusCode: 500,
    statusMessage: `Backend not running on ${runtimeConfig.public.apiUrl}`
  })
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
