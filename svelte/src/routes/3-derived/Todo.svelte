<script lang="ts">
  interface Todo {
    text: string
    completed: boolean
  }

  let todos = $state<Todo[]>([
    { text: 'Learn Svelte', completed: true },
    { text: 'Build a Todo app', completed: true },
    { text: 'Share knowledge', completed: false }
  ])
  let newTodo = $state('')

  function addTodo(event: Event) {
    event.preventDefault()
    if (newTodo.trim() === '') return
    todos.push({ text: newTodo, completed: false })
    newTodo = ''
  }

  function toggleTodo(index: number) {
    todos[index].completed = !todos[index].completed
  }

  function removeTodo(index: number) {
    todos = todos.filter((_, i) => i !== index)
  }

  // Functions
  function completedCountFn() {
    return todos.filter(todo => todo.completed).length
  }
  function remainingCountFn() {
    return todos.filter(todo => !todo.completed).length
  }
  function totalCountFn() {
    return todos.length
  }

  // $effect()
  let completedCountEffect = $state(0)
  let remainingCountEffect = $state(0)
  let totalCountEffect = $state(0)
  $effect(() => {
    completedCountEffect = todos.filter(todo => todo.completed).length
    remainingCountEffect = todos.filter(todo => !todo.completed).length
    totalCountEffect = todos.length
  })

  // $derived()
  let completedCount = $derived(todos.filter(todo => todo.completed).length)
  let remainingCount = $derived(todos.filter(todo => !todo.completed).length)
  let totalCount = $derived(todos.length)
</script>

<div class="max-w-xs">
  <h2 class="text-xl font-bold mb-2">Todo List</h2>
  <form onsubmit={addTodo}>
    <input
      type="text"
      class="input mb-2"
      placeholder="Add a new todo..."
      value={newTodo}
      oninput={(event) => newTodo = (event.target as HTMLInputElement).value}
    />
    <button class="btn">Add Todo</button>
  </form>

  <ul class="mt-4 space-y-2">
    {#each todos as todo, index (index)}
      <li class="flex items-center gap-1">
        <button type="button" class="cursor-pointer" onclick={() => toggleTodo(index)}>
          {todo.completed ? '✅' : '❌'}
        </button>
        <button type="button" class="cursor-pointer" onclick={() => removeTodo(index)}>
          🗑️
        </button>
        <span class={{ 'line-through': todo.completed }}>{todo.text}</span>
      </li>
    {/each}
  </ul>

  <h3 class="mt-2 font-bold">Status (Expression)</h3>
  <ul class="list-disc pl-6">
    <li>Completed: {todos.filter(todo => todo.completed).length}</li>
    <li>Remaining: {todos.filter(todo => !todo.completed).length}</li>
    <li>Total: {todos.length}</li>
  </ul>

  <h3 class="mt-2 font-bold">Status (Function)</h3>
  <ul class="list-disc pl-6">
    <li>Completed: {completedCountFn()}</li>
    <li>Remaining: {remainingCountFn()}</li>
    <li>Total: {totalCountFn()}</li>
  </ul>

  <h3 class="mt-2 font-bold">Status (Effect)</h3>
  <ul class="list-disc pl-6">
    <li>Completed: {completedCountEffect}</li>
    <li>Remaining: {remainingCountEffect}</li>
    <li>Total: {totalCountEffect}</li>
  </ul>

  <h3 class="mt-2 font-bold">Status (Derived)</h3>
  <ul class="list-disc pl-6">
    <li>Completed: {completedCount}</li>
    <li>Remaining: {remainingCount}</li>
    <li>Total: {totalCount}</li>
  </ul>
</div>
