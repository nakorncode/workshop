<template>
  <header class="p-2 bg-blue-200">
    <slot name="header">⛔ Default Content (Header)</slot>
  </header>
  <main class="p-2 bg-green-200">
    <slot>⛔ Default Content (Main)</slot>
  </main>
  <footer class="p-2 bg-pink-200">
    <slot name="footer">⛔ Default Content (Footer)</slot>
  </footer>
</template>
