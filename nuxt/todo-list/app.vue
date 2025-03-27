<script setup lang="ts">
if (import.meta.client) {
  await callOnce(() => {
    const { loadTodoListFromLocalStorage } = useTodo()
    loadTodoListFromLocalStorage()
  })
}

await callOnce(async () => {
  const { getCurrentUser } = useUser()
  await getCurrentUser()
})
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
