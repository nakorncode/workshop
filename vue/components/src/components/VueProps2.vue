<script setup lang="ts">
// ใช้ร่วมกับ withDefaults()

const props = withDefaults(defineProps<{
  title?: string
  quantity?: number
  price?: number
  tags?: string[]
}>(), {
  title: 'EMPTY',
  quantity: 0,
  price: 0,
})
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
