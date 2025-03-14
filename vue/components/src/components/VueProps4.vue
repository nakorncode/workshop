<script setup lang="ts">
// หรือเราอาจจะเรียกผ่าน $props แทนได้เช่นกัน
// ❌ เป็นวิธีเรียกแบบเก่าผ่าน Vue 2 ดังนั้นจึงไม่แนะนำเช่นกัน แต่ก็ใช้งานได้

defineProps<{
  title: string
  quantity: number
  price: number
  tags: string[]
}>()
</script>

<template>
  <div class="product-card">
    <h3>{{ $props.title }}</h3>
    <p><b>Quantity:</b> {{ $props.quantity }}</p>
    <p><b>Price:</b> {{ $props.price }}</p>
    <ul>
      <li v-for="tag in $props.tags" :key="tag">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>
