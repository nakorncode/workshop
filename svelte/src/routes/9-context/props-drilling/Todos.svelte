<script lang="ts">
  import type { Todo as TodoType } from "./modules.svelte"
  import Todo from "./Todo.svelte"
  import TodoStats from "./TodoStats.svelte";

  let todos = $state<TodoType[]>([
    {
      id: crypto.randomUUID(),
      title: 'Sample Todo',
      items: [
        { id: crypto.randomUUID(), text: 'Sample Item 1', completed: false },
        { id: crypto.randomUUID(), text: 'Sample Item 2', completed: true }
      ]
    },
    {
      id: crypto.randomUUID(),
      title: 'Another Todo',
      items: [
        { id: crypto.randomUUID(), text: 'Another Item 1', completed: false },
        { id: crypto.randomUUID(), text: 'Another Item 2', completed: true }
      ]
    }
  ])

  function addNewTodoList(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const title = form.elements.namedItem('title') as HTMLInputElement
    if (title.value.trim() === '') return
    todos.push({
      id: crypto.randomUUID(),
      title: title.value,
      items: []
    })
    title.value = ''
  }
</script>

<div class="max-w-xs">
  <h2 class="text-xl font-bold">Todos (Props Drilling)</h2>

  <div class="mb-3 divide-y divide-gray-300">
    {#each todos as todo}
      <div class="py-4">
        <Todo {todo} />
      </div>
    {/each}
  </div>

  <div class="p-4 bg-gray-200 rounded-md">
    <form onsubmit={addNewTodoList} class="space-y-2">
      <input type="text" name="title" class="input" placeholder="Add a new todo list..." required />
      <button class="btn" type="submit">Add Todo List</button>
    </form>
  </div>

  <div class="mt-4">
    <TodoStats {todos} />
  </div>
</div>
