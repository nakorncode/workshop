<script setup lang="ts">
import { useToast } from 'vue-toast-notification'
import { ref } from 'vue'
import 'vue-toast-notification/dist/theme-default.css'
import VueAttrsDisableInherit from './components/VueAttrsDisableInherit.vue'
import VueAttrsInherit from './components/VueAttrsInherit.vue'
import VueAttrsRoot from './components/VueAttrsRoot.vue'
import VueEmits, { type TodoItem } from './components/VueEmits.vue'
import VueProps1 from './components/VueProps1.vue'
import VueProps2 from './components/VueProps2.vue'
import VueProps3 from './components/VueProps3.vue'
import VueProps4 from './components/VueProps4.vue'
import VuePropsName from './components/VuePropsName.vue'
import VuePropsValidation from './components/VuePropsValidation.vue'
import VueScopedSlot from './components/VueScopedSlot.vue'
import VueSlot from './components/VueSlot.vue'
import VueTwoWayBinding from './components/VueTwoWayBinding.vue'
import VueDefineModel from './components/VueDefineModel.vue'
import VueTransition from './components/VueTransition.vue'
import VueTransitionGroup from './components/VueTransitionGroup.vue'
import VueKeepAliveA from './components/VueKeepAliveA.vue'
import VueKeepAliveB from './components/VueKeepAliveB.vue'
import VueTeleport from './components/VueTeleport.vue'
import VueSuspense from './components/VueSuspense.vue'

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

const products: (ProductItem & { id: number })[] = [
  {
    id: 1,
    title: 'Product 1A',
    quantity: 10,
    price: 19.99,
    tags: ['tag1', 'tag2', 'tag3']
  },
  {
    id: 2,
    title: 'Product 2A',
    quantity: 18,
    price: 27.99,
    tags: ['tag7', 'tag8', 'tag9']
  },
  {
    id: 3,
    title: 'Product 3A',
    quantity: 5,
    price: 14.99,
    tags: ['tag13', 'tag14', 'tag15']
  }
]

const toast = useToast({
  position: 'top',
  duration: 5000
})

function onInit() {
  toast.success('Todo loaded! 🚀')
}

function onCreated(item: TodoItem) {
  toast.success(`Todo created: ${item.text} 🆕`)
}

function onStatusUpdated(from: TodoItem, to: TodoItem) {
  toast.info(`Todo status updated: ${from.text}: From ${from.done ? '✅' : '❌'} To ${to.done ? '✅' : '❌'}`)
}

function onDeleted(item: TodoItem, key: number) {
  toast.error(`Todo deleted: ${item.text} (Item at ${key + 1}) 🗑️`)
}

const logo = ref({
  title: 'LOGO',
  bgColor: '#000000',
  textColor: '#ffffff'
})

const keepAliveType = ref<'A' | 'B'>('A')
const showModal = ref(false)
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

    <h2>Vue Slot (Scoped Slot)</h2>
    <div class="space-y-4">
      <VueScopedSlot :products="products">
        <template #title>
          <h3>Product List (Default)</h3>
        </template>
      </VueScopedSlot>

      <VueScopedSlot :products="products">
        <template #title>
          <h3>Product List (Custom with Scoped Slot)</h3>
        </template>
        <template #col-head>
          <th>📝 ไอดี</th>
          <th>📚 ชื่อ</th>
          <th>📦 จำนวน</th>
          <th>💸 ราคา</th>
          <th>🔗 ลิงก์สินค้า</th>
        </template>
        <template #col-body="{ product }">
          <td># {{ product.id }}</td>
          <td class="text-purple-700 font-bold">{{ product.title }}</td>
          <td>{{ product.quantity }} ชิ้น</td>
          <td>{{ product.price }} ดอลล่าห์</td>
          <td>
            <a :href="`https://example.com/products/${product.id}`" target="_blank">/products/{{ product.id }}</a>
          </td>
        </template>
      </VueScopedSlot>
    </div>

    <hr>

    <h2>Vue Attrs (Auto Inherit on Single Root)</h2>
    <div class="mb-8">
      <VueAttrsRoot class="bg-red-200 p-2 rounded shadow-md"></VueAttrsRoot>
    </div>

    <h2>Vue Attrs (Inherit on Multi Root)</h2>
    <div class="mb-8">
      <VueAttrsInherit class="bg-red-200 p-2 rounded shadow-md"></VueAttrsInherit>
    </div>

    <h2>Vue Attrs (Disable Inherit on Root)</h2>
    <div>
      <VueAttrsDisableInherit class="bg-red-200 p-2 rounded shadow-md"></VueAttrsDisableInherit>
    </div>

    <hr>

    <h2>Vue Events Emitting</h2>
    <VueEmits @init="onInit" @created="onCreated" @deleted="onDeleted" @status-updated="onStatusUpdated"></VueEmits>

    <hr>

    <h2><code>v-model</code></h2>
    <div class="space-y-4">
      <div :style="{ backgroundColor: logo.bgColor, color: logo.textColor }" class="p-4 rounded-md shadow-lg font-bold text-xl">
        {{ logo.title }}
      </div>
      <VueTwoWayBinding
        :model-value="logo.title"
        :bg-color="logo.bgColor"
        :text-color="logo.textColor"
        @update:model-value="logo.title = $event"
        @update:bg-color="logo.bgColor = $event"
        @update:text-color="logo.textColor = $event"
      ></VueTwoWayBinding>
      <VueTwoWayBinding
        v-model="logo.title"
        v-model:bg-color="logo.bgColor"
        v-model:text-color="logo.textColor"
      ></VueTwoWayBinding>
      <VueDefineModel
        v-model="logo.title"
        v-model:bg-color="logo.bgColor"
        v-model:text-color="logo.textColor"
      ></VueDefineModel>
    </div>

    <hr>

    <h2>Vue Built-in Components (Transition)</h2>
    <VueTransition></VueTransition>

    <h2>Vue Built-in Components (TransitionGroup)</h2>
    <VueTransitionGroup></VueTransitionGroup>

    <h2>Vue Built-in Components (KeepAlive)</h2>
    <button type="button" class="btn mb-2" @click="keepAliveType = keepAliveType === 'A' ? 'B' : 'A'">Switch</button>
    <KeepAlive>
      <component :is="keepAliveType === 'A' ? VueKeepAliveA : VueKeepAliveB"></component>
    </KeepAlive>

    <h2>Vue Built-in Components (Teleport)</h2>
    <button type="button" class="btn mb-2" @click="showModal = !showModal">Toggle Modal</button>
    <VueTeleport v-if="showModal" @close="showModal = false">Hello Modal!</VueTeleport>

    <h2>Vue Built-in Components (Suspense)</h2>
    <Suspense>
      <template #default>
        <VueSuspense></VueSuspense>
      </template>
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>
