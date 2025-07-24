<script lang="ts">
  import type { Todo } from "./modules.svelte"
  import TodoItemForm from "./TodoItemForm.svelte"
  import TodoItem from "./TodoItem.svelte"
  import TodoActions from "./TodoActions.svelte";

  interface Props {
    todo: Todo
  }
  let { todo }: Props = $props()
</script>

<div class="flex gap-3 items-center justify-between mb-1">
  <h3 class="font-bold">{todo.title}</h3>
  <TodoActions {todo} />
</div>

{#each todo.items as todoItem (todoItem.id)}
  <TodoItem todoItems={todoItem} />
{/each}

<div class="mt-2">
  <TodoItemForm onAdd={todoItem => todo.items.push(todoItem)} />
</div>
