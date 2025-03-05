<script setup lang="ts">
const props = defineProps<{
  products: {
    id: number
    title: string
    quantity: number
    price: number
    tags: string[]
  }[]
}>()
</script>

<template>
  <div class="prose prose-td:py-1 prose-ul:my-0 border border-gray-300 rounded-md bg-gray-100 p-2 prose-h3:text-lg prose-h3:text-center">
    <slot name="title">
      <h3>Product List</h3>
    </slot>
    <table>
      <thead>
        <tr>
          <slot name="col-head">
            <th>ID</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Tags</th>
          </slot>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in props.products" :key="product.id">
          <!-- ส่วนของ <slot> หากมีการใช้ v-bind (:) จะหมายถึงเป็นการทำ Scoped Slot ที่สามารถส่งข้อมูลไปยัง Parent ให้ดังแปลงเนื้อหาได้ -->
          <slot name="col-body" :product="product">
            <td>{{ product.id }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}</td>
            <td>
              <ul class="list-none flex gap-1">
                <li v-for="tag in product.tags" :key="tag" class="px-2 py-1 bg-gray-300 text-xs rounded">
                  {{ tag }}
                </li>
              </ul>
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>
