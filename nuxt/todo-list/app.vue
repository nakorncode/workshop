<script setup lang="ts">
if (import.meta.client) {
  await callOnce(() => {
    const { loadTodoListFromLocalStorage } = useTodo()
    loadTodoListFromLocalStorage()
  })
}
</script>

<template>
  <div>
    <UApp>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </UApp>
  </div>
</template>
