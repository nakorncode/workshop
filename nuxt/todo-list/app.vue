<script setup lang="ts">
if (import.meta.client) {
  await callOnce(async () => {
    const { loadTodoListFromLocalStorage, loadTodoListFromOnline } = useTodo()
    const { user } = useUser()
    loadTodoListFromLocalStorage()
    if (user.value) {
      await loadTodoListFromOnline()
    }
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
