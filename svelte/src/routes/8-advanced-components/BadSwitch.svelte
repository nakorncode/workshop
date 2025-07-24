<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements"

  // ในนี้จะมี children?: Snippet มาให้ด้วย สำหรับการใช้แสดงผลบน {@render props.children?.()}
  interface Props extends HTMLInputAttributes {
    value: boolean
    onUpdateValue: (value: boolean) => void
  }
  let props: Props = $props()
</script>

<label class="inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    class="sr-only peer"
    checked={props.value}
    oninput={e => props.onUpdateValue((e.target as HTMLInputElement).checked)}
  >
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
    {@render props.children?.()}
  </span>
</label>
