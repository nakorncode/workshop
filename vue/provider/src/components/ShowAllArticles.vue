<script setup lang="ts">
import { ThemeName } from '../App.vue'
import ArticleWithInject from './ArticleWithInject.vue'
import ArticleWithoutInject from './ArticleWithoutInject.vue'

const props = defineProps<{
  theme: ThemeName
}>()
</script>

<template>
  <div class="space-y-4">
    <!-- ✅ ส่วนนี้ไม่จำเป็นต้องส่งข้อมูลข้ามไปๆมาๆ เพราะ Parent provide ข้อมูลให้ จากนั้น Child inject ที่อยากรับข้าม Components ได้ -->
    <ArticleWithInject></ArticleWithInject>

    <!-- ❌ ส่วนนี้จะเกิดปัญหา Props Drilling -->
    <ArticleWithoutInject :theme="props.theme"></ArticleWithoutInject>
  </div>
</template>
