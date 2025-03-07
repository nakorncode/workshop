<script setup lang="ts">
import ShowAllArticles from './components/ShowAllArticles.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { type Ref, ref, provide } from 'vue'

export type ThemeName = 'light' | 'dark' | 'fancy'

const theme = ref<ThemeName>('light')

provide<Ref<ThemeName>>('theme', theme)
</script>

<template>
  <div class="max-w-md p-4">
    <ThemeSwitcher v-model="theme"></ThemeSwitcher>
    <hr>

    <!-- Provide from Parent into Inject in Child -->
    <!-- ⚠️ หากไม่ใช่ Provide/Inject จะมีปัญหา Props Drilling: https://vuejs.org/guide/components/provide-inject.html#prop-drilling -->
    <ShowAllArticles :theme="theme"></ShowAllArticles>
  </div>
</template>
