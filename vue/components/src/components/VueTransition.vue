<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <div>
    <button type="button" @click="show = !show" class="btn">Toggle</button>
    <Transition name="fade">
      <div v-if="show" class="mt-2 p-4 bg-gray-200 rounded-md">
        Hello, world!
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
