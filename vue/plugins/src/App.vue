<script setup lang="ts">
import { inject, type Ref } from 'vue'

const translate = inject<(lang: string) => string>('translate')
const setLanguage = inject<(lang: string) => void>('setLanguage')
const currentLanguage = inject<Ref<string>>('currentLanguage')
</script>

<template>
  <div class="max-w-md p-4">
    <h2>Translate</h2>
    <select
      @input="$event => setLanguage?.(($event.target as HTMLSelectElement).value)"
      :value="currentLanguage"
      class="border border-gray-400 rounded p-1">
      <option value="en">English</option>
      <option value="th">Thai</option>
      <option value="jp">Japanese</option>
    </select>
    <p class="my-2 text-lg">hello: {{ translate?.('hello') }}</p>

    <hr>

    <h2>Tooltip Directive</h2>
    <abbr v-tooltip="'HyperText Markup Language'" class="underline decoration-dotted">HTML</abbr>
  </div>
</template>
