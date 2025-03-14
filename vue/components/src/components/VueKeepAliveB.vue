<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <input type="number" class="input" v-model="count">
</template>
