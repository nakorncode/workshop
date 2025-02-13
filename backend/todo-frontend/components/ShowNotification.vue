<script setup lang="ts">
import { isEmpty } from 'lodash-es'

const props = defineProps<{
  errors?: Record<string, string> | string[] | string | null
  messages?: string | string[] | null
}>()
</script>

<template>
  <div>
    <div v-if="!isEmpty(props.errors) && props.errors" class="p-3 rounded-md bg-red-100 text-red-700">
      <ul class="list-disc pl-6">
        <li v-if="typeof props.errors === 'string'">
          {{ props.errors }}
        </li>
        <li v-else-if="Array.isArray(props.errors)" v-for="error in props.errors">
          {{ error }}
        </li>
        <li v-else v-for="error in Object.values(props.errors)">
          {{ error }}
        </li>
      </ul>
    </div>

    <div v-if="!isEmpty(props.messages) && props.messages" class="p-3 rounded-md bg-green-100 text-green-700">
      <ul class="list-disc pl-6">
        <li v-if="typeof props.messages === 'string'">
          {{ props.messages }}
        </li>
        <li v-else-if="Array.isArray(props.messages)" v-for="message in props.messages">
          {{ message }}
        </li>
      </ul>
    </div>
  </div>
</template>
