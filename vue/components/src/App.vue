<script setup lang="ts">
import VueProps1 from './components/VueProps1.vue'
import VueProps2 from './components/VueProps2.vue'
import VueProps3 from './components/VueProps3.vue'
import VueProps4 from './components/VueProps4.vue'
import VuePropsName from './components/VuePropsName.vue'
import VuePropsValidation from './components/VuePropsValidation.vue'
import VueSlot from './components/VueSlot.vue'

interface ProductItem {
  title: string
  quantity: number
  price: number
  tags: string[]
}

const product1B: ProductItem = {
  title: 'Product 1B',
  quantity: 15,
  price: 24.99,
  tags: ['tag4', 'tag5', 'tag6']
}
</script>

<template>
  <div class="max-w-xl p-4">
    <h2>Vue Props</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <!-- กรณีที่เราส่งทุกอย่างเป็น props="data" จะหมายถึง String ดังนั้นหากต้องการส่ง Type อย่างอื่นให้ทำ :props="data" แทน -->
      <VueProps1 title="Product 1A" :quantity="10" :price="19.99" :tags="['tag1', 'tag2', 'tag3']"></VueProps1>
      <VueProps1 v-bind="product1B"></VueProps1>

      <VueProps2 title="Product 2A" :quantity="18" :price="27.99" :tags="['tag7', 'tag8', 'tag9']"></VueProps2>
      <VueProps2></VueProps2> <!-- เรียกแบบไม่ส่งข้อมูล เพื่อใช้ข้อมูลจาก withDefaults() -->

      <VueProps3 title="Product 3A" :quantity="20" :price="29.99" :tags="['tag10', 'tag11', 'tag12']"></VueProps3>
      <VueProps4 title="Product 4A" :quantity="25" :price="34.99" :tags="['tag13', 'tag14', 'tag15']"></VueProps4>

      <VuePropsValidation title="Product 5A" :quantity="30" :price="39.99" :tags="['tag16', 'tag17', 'tag18']"></VuePropsValidation>
      <VuePropsValidation title="" :quantity="-1" :price="NaN" :tags="[16, 17, 'tag18']"></VuePropsValidation>

      <VuePropsName product-name="Product 6A" :will-available-on="new Date('2026-01-01')"></VuePropsName>
    </div>

    <hr>

    <h2>Vue Slot (Fallback Slot)</h2>
    <VueSlot></VueSlot>

    <h2>Vue Slot (Named Slot)</h2>
    <VueSlot>
      ✅ Named Content (Main)
      <template #header>✅ Named Content (Header)</template>
      <template #footer>✅ Named Content (Footer)</template>
    </VueSlot>
  </div>
</template>
