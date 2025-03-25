export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) {
    const header = useResponseHeader('X-Engine');
    header.value = 'ABC';
  }
})