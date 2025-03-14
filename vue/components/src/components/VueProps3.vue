<script setup lang="ts">
// defineProps() จะช่วยให้ <template> สามารถเข้าถึงข้อมูลได้เลย โดยไม่จำเป็นต้องเรียกผ่านตัวแปร props ก็ได้
// ❌ แต่ก็ไม่แนะนำ เพราะอาจจะทำให้เรียกซ้ำกับตัวแปรทั่วไปได้

defineProps<{
  title: string
  quantity: number
  price: number
  tags: string[]
}>()
</script>

<template>
  <div class="product-card">
    <h3>{{ title }}</h3>
    <p><b>Quantity:</b> {{ quantity }}</p>
    <p><b>Price:</b> {{ price }}</p>
    <ul>
      <li v-for="tag in tags" :key="tag">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>
