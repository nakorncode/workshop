<script setup lang="ts">
import Basic from './components/Basic.vue'
import Practical from './components/Practical.vue'
import { ref } from 'vue'

const showBasic = ref(true)
const showPractical = ref(true)
</script>

<template>
  <div class="max-w-md p-4">
    <Basic v-if="showBasic"></Basic>

    <hr>

    <button class="!bg-gray-700" @click="showBasic = !showBasic">{{ showBasic ? 'Hide Basic' : 'Show Basic' }}</button>

    <hr>

    <Practical v-if="showPractical"></Practical>

    <hr>

    <button class="!bg-gray-700" @click="showPractical = !showPractical">{{ showPractical ? 'Hide Practical' : 'Show Practical' }}</button>
  </div>
</template>
