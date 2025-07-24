<script lang="ts">
  import type { TodoItem } from "./modules.svelte"

  interface Props {
    todoItems: TodoItem
  }
  let { todoItems }: Props = $props()
</script>

<div>
  <label>
    <input type="checkbox" bind:checked={todoItems.completed} />
    <span class:line-through={todoItems.completed}>{todoItems.text}</span>
  </label>
</div>
