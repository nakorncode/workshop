<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const { data } = useFetch<Product>(`https://dummyjson.com/products/${id}?select=id,title,price`)
</script>

<template>
  <div>
    <div v-if="data">
      <h1>{{ data.title }}</h1>
      <p>Price: {{ data.price }}</p>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>