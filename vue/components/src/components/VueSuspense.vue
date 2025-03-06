<script setup lang="ts">
function someSlowFunction() {
  return new Promise((resolve) => setTimeout(resolve, 3000))
}

await someSlowFunction()
</script>

<template>
  <p>This is slow loading components</p>
</template>
