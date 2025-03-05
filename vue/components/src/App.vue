<script setup lang="ts">
import VueSlot from './components/VueSlot.vue'

</script>

<template>
  <h2>Vue Slot (Fallback Slot)</h2>
  <VueSlot></VueSlot>

  <h2>Vue Slot (Named Slot)</h2>
  <VueSlot>
    ✅ Named Content (Main)
    <template #header>✅ Named Content (Header)</template>
    <template #footer>✅ Named Content (Footer)</template>
  </VueSlot>
</template>

<style scoped>
@reference "tailwindcss";

h2 {
  @apply text-xl font-bold my-3;
}
</style>
