<script setup lang="ts">
// useAsyncData = server || client
// const { data, status } = useAsyncData<{ products: Product[] }>(async () => {
//   const data = await $fetch<{ products: Product[] }>('https://dummyjson.com/products?select=id,title,price')
//   return data
// })

const { data, status } = useFetch<{ products: Product[] }>('https://dummyjson.com/products?select=id,title,price')
</script>

<template>
  <div>
    <p>Status: {{ status }}</p>
    <ul>
      <li v-for="product in data?.products" :key="product.id">
        <NuxtLink :to="`/products/${product.id}`">
          {{ product.title }} ({{ product.price }})
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>