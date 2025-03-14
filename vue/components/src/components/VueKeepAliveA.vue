<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="flex gap-1 items-center">
    <button type="button" class="btn" @click="count--">-</button>
    <p class="text-2xl font-bold px-3">{{ count }}</p>
    <button type="button" class="btn" @click="count++">+</button>
  </div>
</template>
