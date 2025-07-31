<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements"

  // Extends HTMLInputAttributes มาทั้งหมด และเพิ่ม label ของเราสำหรับแสดงผล <label>
  interface Props extends HTMLInputAttributes {
    label?: string
  }

  let props: Props = $props()

  let id = $props.id() // Generate Unique ID สำหรับ label และ input
</script>

{#if props.label}
  <label for={id} class="block mb-1 text-sm font-medium text-gray-700">
    {props.label}
  </label>
{/if}

<input
  id={id}
  class="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  {...props}
/>
