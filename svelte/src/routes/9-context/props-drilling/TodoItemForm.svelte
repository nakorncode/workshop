<script lang="ts">
  import type { TodoItem } from "./modules.svelte"

  interface Props {
    onAdd: (todoItem: TodoItem) => void
  }
  let props: Props = $props()

  let todoItem = $state<TodoItem>({
    id: crypto.randomUUID(),
    text: '',
    completed: false
  })

  function resetTodoItem() {
    todoItem = {
      id: crypto.randomUUID(),
      text: '',
      completed: false
    }
  }
  function onsubmit(event: Event) {
    event.preventDefault()
    if (todoItem.text.trim() === '') return
    props.onAdd(todoItem)
    resetTodoItem()
  }
</script>

<form {onsubmit} class="space-y-2 max-w-xs">
  <input type="text" bind:value={todoItem.text} placeholder="Enter todo item..." class="input" required />
  <button class="btn" type="submit">Add</button>
</form>
