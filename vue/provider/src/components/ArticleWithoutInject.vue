<script setup lang="ts">
import { computed } from 'vue'
import { type ThemeName } from '../App.vue'

const props = defineProps<{
  theme: ThemeName
}>()

const articleClass = computed(() => {
  if (props.theme === 'light') {
    return 'theme-light'
  } else if (props.theme === 'dark') {
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
