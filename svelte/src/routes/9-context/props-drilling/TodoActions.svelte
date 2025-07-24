<script lang="ts">
  import type { Todo } from "./modules.svelte"

  interface Props {
    todo: Todo
  }
  let { todo }: Props = $props()
  let completed = $derived(todo.items.every(item => item.completed))
</script>

<button onclick={() => {
  const currentCompleted = completed
  for (const item of todo.items) {
    item.completed = !currentCompleted
  }
}} type="button" class="underline text-blue-600 cursor-pointer">Mark {completed ? 'Incomplete' : 'Complete'}</button>
