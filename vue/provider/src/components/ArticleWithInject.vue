<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'
import { type ThemeName } from '../App.vue'

const theme = inject<Ref<ThemeName>>('theme')

const articleClass = computed(() => {
  if (!theme) {
    return 'theme-light'
  } else if (theme.value === 'light') {
    return 'theme-light'
  } else if (theme.value === 'dark') {
    return 'theme-dark'
  } else {
    return 'theme-fancy'
  }
})
</script>

<template>
  <article :class="articleClass" class="prose prose-h2:text-inherit">
    <h2>Article (Theme: {{ theme || 'undefined' }})</h2>
    <p>Nisi elit in est irure ea incididunt dolor deserunt nostrud incididunt.</p>
    <p>Minim reprehenderit amet ad enim dolor veniam ut ad voluptate reprehenderit deserunt veniam.</p>
  </article>
</template>
