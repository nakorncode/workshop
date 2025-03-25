<script setup lang="ts">
const error = useError()
</script>

<template>
  <h1>Error!</h1>
  <p>Status: {{ error?.statusCode }}</p>
  <p>Message: {{ error?.message }}</p>
</template>