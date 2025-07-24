<script lang="ts">
  import type { Todo } from "./modules.svelte";

  interface Props {
    todos: Todo[]
  }
  let { todos }: Props = $props()
</script>

<ul class="list-disc pl-5">
  <li>Todo List Total: {todos.length}</li>
  <li>Completed Todos: {todos.filter(todo => todo.items.every(item => item.completed)).length}</li>
  <li>Incomplete Todos: {todos.filter(todo => !todo.items.every(item => item.completed)).length}</li>
  <li>Total Items: {todos.reduce((total, todo) => total + todo.items.length, 0)}</li>
  <li>Completed Items: {todos.reduce((total, todo) => total + todo.items.filter(item => item.completed).length, 0)}</li>
  <li>Incomplete Items: {todos.reduce((total, todo) => total + todo.items.filter(item => !item.completed).length, 0)}</li>
  <li>Average Items per Todo: {todos.length > 0 ? (todos.reduce((total, todo) => total + todo.items.length, 0) / todos.length).toFixed(2) : '0'}</li>
</ul>
