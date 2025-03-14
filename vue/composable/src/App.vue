<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import CartViewer from './components/CartViewer.vue'
import ProductList from './components/ProductList.vue'
</script>

<template>
  <div class="p-4">
    <h2><code>&lt;Navbar&gt;</code></h2>
    <Navbar></Navbar>

    <hr>

    <h2><code>&lt;ProductList&gt;</code></h2>
    <ProductList></ProductList>

    <hr>

    <h2><code>&lt;CartViewer&gt;</code></h2>
    <CartViewer></CartViewer>
  </div>
</template>
