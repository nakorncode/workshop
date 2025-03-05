<script setup lang="ts">
// import { defineProps } from 'vue'

// ✅ วิธีที่แนะนำ (defineProps ไม่จำเป็นต้อง import และยังสามารถใช้งานได้)

const props = defineProps<{
  title: string
  quantity: number
  price: number
  tags: string[]
}>()
</script>

<template>
  <div class="product-card">
    <h3>{{ props.title }}</h3>
    <p><b>Quantity:</b> {{ props.quantity }}</p>
    <p><b>Price:</b> {{ props.price }}</p>
    <ul>
      <li v-for="tag in props.tags" :key="tag">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>
