<script setup lang="ts">
import { useAttrs } from 'vue'

// เนื่องจาก Multi root elements จะไม่สามารถสืบทอด Attrs ด้วยตนเองได้ จึงต้องทำแบบ Manual
const attrs = useAttrs()
</script>

<template>
  <p>This is first line</p>

  <!-- Bind ทุกๆ Attributes ไปยัง Element ที่กำหนด -->
  <p v-bind="attrs">This is second line</p>
</template>
