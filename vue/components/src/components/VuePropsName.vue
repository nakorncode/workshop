<script setup lang="ts">
// ชื่อ props camelCase จะถูกแปลงเป็น kebab-case เมื่อเรียกใช้งานบน Parent
// ถือเป็นเรื่องหนึ่งที่ผมไม่ค่อยชอบ Vue เรื่องนี้ 😅

const props = defineProps<{
  productName: string
  willAvailableOn: Date
}>()
</script>

<template>
  <div class="product-card">
    <h3>{{ props.productName }}</h3>
    <i class="text-sm text-gray-600">Will be available on:<br>{{ props.willAvailableOn.toLocaleString() }}</i>
  </div>
</template>
