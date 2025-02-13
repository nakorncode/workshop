<script setup lang="ts">
import './assets/styles.css'

useSeoMeta({
  title: 'My Todo'
})

const runtimeConfig = useRuntimeConfig()
const fetch = useFetchBackend()
const notification = useNotification()
const route = useRoute()

try {
  await fetch('/ok')
} catch (error) {
  throw createError({
    statusCode: 500,
    statusMessage: `Backend not running on ${runtimeConfig.public.apiUrl}`
  })
}

watch(() => route.path, () => {
  if (notification.seen.value) {
    notification.setError(null)
    notification.setMessage(null)
  }
  notification.setSeen()
})
</script>

<template>
  <div class="p-3 text-gray-800">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
