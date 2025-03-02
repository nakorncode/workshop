<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onUpdated, onBeforeUpdate, onUnmounted, onBeforeUnmount } from 'vue'

console.log('On setup')

onMounted(() => {
  console.log('On mounted')
})

onBeforeMount(() => {
  console.log('On before mount')
})

onUpdated(() => {
  console.log('On updated')
})

onBeforeUpdate(() => {
  console.log('On before update')
})

onUnmounted(() => {
  console.log('On unmounted')
})

onBeforeUnmount(() => {
  console.log('On before unmount')
})

const currentTime = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

function onButtonTimeClick() {
  if (timer) {
    clearInterval(timer)
    timer = null
  } else {
    timer = setInterval(() => {
      currentTime.value = new Date()
    }, 1000)
  }
}
</script>

<template>
  <h2>Basic</h2>
  <p>Current time: {{ currentTime }}</p>
  <button @click="onButtonTimeClick" type="button">{{ timer ? 'Stop' : 'Start' }}</button>
</template>
