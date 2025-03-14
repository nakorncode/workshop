<script setup lang="ts">
// สามารถใช้ validator ช่วยตรวจสอบความถูกต้องข้อมูลเพิ่มเติมได้
// แต่ส่วนนี้เป็นงานของ JavaScript ดังนั้นจะมีการเตือนบน console.warn() เท่านั้น
// ⚠️ ดังนั้นหากต้องการใช้คุณสมบัติ TypeScript แนะนำเป็นวิธี defineProps<>() ผ่าน Generic จะดีกว่าวิธีนี้

const props = defineProps({
  title: {
    type: String,
    required: true,
    validator: (value: string) => {
      return value.length > 0
    }
  },
  quantity: {
    type: Number,
    required: true,
    validator: (value: number) => {
      return value > 0
    }
  },
  price: {
    type: Number,
    required: true,
    validator: (value: number) => {
      return value > 0
    }
  },
  tags: {
    type: Array,
    required: true,
    validator: (value: string[]) => {
      return value.length > 0 && value.every((tag) => typeof tag === 'string')
    }
  }
})
</script>

<template>
  <div class="product-card">
    <h3>{{ props.title }}</h3>
    <p><b>Quantity:</b> {{ props.quantity }}</p>
    <p><b>Price:</b> {{ props.price }}</p>
    <ul>
      <li v-for="tag in props.tags">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>
