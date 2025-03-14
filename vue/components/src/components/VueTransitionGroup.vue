<script setup lang="ts">
import { ref } from 'vue'
import { shuffle } from 'lodash-es'

const list = ref<string[]>([
  'A', 'B', 'C', 'D', 'E', 'F'
])

function addList() {
  const startChar = 'a'
  const nextChar = String.fromCharCode(startChar.charCodeAt(0) + list.value.length).toUpperCase()
  list.value.push(nextChar)
}

function removeList() {
  list.value.shift()
}

function shuffleList() {
  list.value = shuffle(list.value)
}
</script>

<template>
  <div>
    <div class="flex gap-2 mb-3">
      <button type="button" class="btn" @click="addList">Add</button>
      <button type="button" class="btn" @click="removeList">Remove</button>
      <button type="button" class="btn" @click="shuffleList">Shuffle</button>
    </div>
    <TransitionGroup name="list" tag="ul" class="list-disc pl-6 space-y-1">
      <li v-for="item in list" :key="item" class="list-item">{{ item }}</li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
