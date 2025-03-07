<script setup lang="ts">
import { defineModel } from 'vue'

const theme = defineModel()
</script>

<template>
  <div class="space-x-6 p-3 rounded shadow-md border border-gray-300 inline-block">
    <label>
      <input v-model="theme" type="radio" value="light">
      <span>☀️ Light</span>
    </label>
    <label>
      <input v-model="theme" type="radio" value="dark">
      <span>🌙 Dark</span>
    </label>
    <label>
      <input v-model="theme" type="radio" value="fancy">
      <span>🌈 Fancy</span>
    </label>
  </div>
</template>
