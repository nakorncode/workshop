<script setup lang="ts">
defineProps<{
  title: string
  quantity: number
  price: number
}>()
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Quantity: {{ quantity }}</p>
    <p>Price: {{ price }}</p>
  </div>
</template>
