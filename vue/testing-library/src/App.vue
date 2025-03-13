<script setup lang="ts">
import MyButton from './components/MyButton.vue';

function onClick() {
  alert('Clicked!')
}
</script>

<template>
  <div class="max-w-md p-4">
    <h2>MyButton.vue</h2>

    <div class="flex flex-wrap items-center gap-1">
      <MyButton></MyButton>
      <MyButton size="sm">sm</MyButton>
      <MyButton size="md">md</MyButton>
      <MyButton size="lg">lg</MyButton>
      <MyButton color="amber">amber</MyButton>
      <MyButton color="blue">blue</MyButton>
      <MyButton color="red">red</MyButton>
      <MyButton color="gray">gray</MyButton>
      <MyButton color="black">black</MyButton>
      <MyButton disabled>disabled</MyButton>
      <MyButton loading>loading</MyButton>
      <MyButton @click="onClick">v-on:click</MyButton>
    </div>

    <hr>

    <h2>TodoList.vue</h2>

    <hr>

    <h2>CreateTodo.vue</h2>
  </div>
</template>
