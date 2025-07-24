<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  interface Props {
    children?: Snippet // เหมือนกับ React ที่สามารถรับ props.children มาใช้งาน แต่ Svelte จะเป็นรูปแบบ Snippet
    button: Snippet<[{ toggle: () => void }]> // คล้ายกับ Scoped Slot ใน Vue
    isOpen: boolean
    duration?: number
  }

  let { isOpen = $bindable(), ...props }: Props = $props()
</script>

{#if isOpen}
  <div transition:fade={{ duration: props.duration || 300 }} class="fixed inset-0 flex items-center justify-center bg-gray-800/30 z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
      <button type="button" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer" onclick={() => isOpen = false}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
      </button>
      {@render props.children?.()}
    </div>
  </div>
{/if}

<div>
  {@render props.button({ toggle: () => isOpen = !isOpen })}
</div>
