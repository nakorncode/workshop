<script setup lang="ts">
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false // ไม่สืบทอดข้อมูล Attributes จาก Parent
})

const attrs = useAttrs()
</script>

<template>
  <div>
    <p>This is first line</p>
    <p v-bind="attrs">This is second line</p>
  </div>
</template>
