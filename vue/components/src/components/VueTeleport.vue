<script setup lang="ts">
const emit = defineEmits<{
  'close': []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="bg-black/80 fixed inset-0 flex justify-center items-center">
      <div class="bg-white rounded-md p-4 max-w-sm w-full my-4 relative">
        <button type="button" @click="emit('close')" class="absolute top-4 right-4 cursor-pointer">✖️</button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
