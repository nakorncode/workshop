<script setup lang="ts">
import Basic from './components/Basic.vue'
import Practical from './components/Practical.vue'
import { ref } from 'vue'

const showBasic = ref(true)
const showPractical = ref(true)
</script>

<template>
  <Basic v-if="showBasic"></Basic>

  <hr>

  <button @click="showBasic = !showBasic">{{ showBasic ? 'Hide Basic' : 'Show Basic' }}</button>

  <hr>

  <Practical v-if="showPractical"></Practical>

  <hr>

  <button @click="showPractical = !showPractical">{{ showPractical ? 'Hide Practical' : 'Show Practical' }}</button>
</template>
