<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'only-admin'
})

const route = useRoute()

if (Number(route.params.id) < 1) {
  await navigateTo('/admin/products')
}
</script>

<template>
  <h1>Product ID: {{ route.params.id }}</h1>
</template>