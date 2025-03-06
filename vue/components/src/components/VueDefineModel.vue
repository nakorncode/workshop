<script setup lang="ts">
const title = defineModel()
const bgColor = defineModel('bgColor')
const textColor = defineModel('textColor')
</script>

<template>
  <div class="flex gap-2">
    <input
      type="text"
      class="input"
      v-model="title">
    <input
      type="color"
      class="w-12 h-12"
      v-model="bgColor">
    <input
      type="color"
      class="w-12 h-12"
      v-model="textColor">
  </div>
</template>
