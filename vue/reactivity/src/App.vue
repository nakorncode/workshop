<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

// ref (with type)
const firstName = ref<string>('')
const lastName = ref<string>('')

// reactive (with type)
interface FullName {
  firstName: string
  lastName: string
}
const fullName = reactive<FullName>({
  firstName: '',
  lastName: ''
})

// computed (with type)
const showFullNameFromRef = computed<string>(() => {
  console.log('[✅ cached] [ref] computed called')
  // 👉 หากต้องการใช้ ref() จะต้องเรียก .value ทุกครั้ง
  return `${firstName.value} ${lastName.value}`
})
const showFullNameFromReactive = computed<string>(() => {
  console.log('[✅ cached] [reactive] computed called')
  return `${fullName.firstName} ${fullName.lastName}`
})

// method (no caching)
const badShowFullNameFromRef = () => {
  console.log('[❌ not cached] [ref] method called')
  return `${firstName.value} ${lastName.value}`
}
const badShowFullNameFromReactive = () => {
  console.log('[❌ not cached] [reactive] method called')
  return `${fullName.firstName} ${fullName.lastName}`
}
</script>

<template>
  <div class="max-w-md p-4">
    <h2>ref()</h2>
    <div class="space-y-3">
      <p><b>First Name:</b> {{ firstName }}</p>
      <p><b>Last Name:</b> {{ lastName }}</p>
      <p><b>Full Name (computed):</b> {{ showFullNameFromRef }}</p>
      <p><b>Full Name (method):</b> {{ badShowFullNameFromRef() }}</p>
      <input v-model="firstName" type="text" placeholder="First Name" />
      <input v-model="lastName" type="text" placeholder="Last Name" />
    </div>

    <hr>

    <h2>reactive()</h2>
    <div class="space-y-3">
      <p><b>First Name:</b> {{ fullName.firstName }}</p>
      <p><b>Last Name:</b> {{ fullName.lastName }}</p>
      <p><b>Full Name (computed):</b> {{ showFullNameFromReactive }}</p>
      <p><b>Full Name (method):</b> {{ badShowFullNameFromReactive() }}</p>
      <input v-model="fullName.firstName" type="text" placeholder="First Name" />
      <input v-model="fullName.lastName" type="text" placeholder="Last Name" />
    </div>
  </div>
</template>
