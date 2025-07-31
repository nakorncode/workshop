<script lang="ts">
  interface Todo {
    text: string
    completed: boolean
  }
  let todos = $state<Todo[]>([ // Reference Types อย่าง Array, Object ก็สามารถอัปเดตข้อมูลผ่าน todos = [] ได้
    { text: 'Learn Svelte', completed: true },
    { text: 'Build a Svelte app', completed: false }
  ])
  function addTodo(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const text = form.elements.namedItem('todo') as HTMLInputElement
    todos.push({ text: text.value, completed: false })
    text.value = ''
  }
  function toggleTodo(index: number) {
    todos[index].completed = !todos[index].completed
  }
  function markAllCompleted() {
    todos = todos.map(todo => ({ ...todo, completed: true }))
  }
  function resetTodos() {
    todos = []
  }
</script>

<h2 class="text-xl font-bold mb-2">Todos</h2>
<div class="space-x-2">
  <button type="button" class="underline text-blue-600 cursor-pointer mb-2" onclick={() => markAllCompleted()}>Mark all as completed</button>
  <button type="button" class="underline text-blue-600 cursor-pointer mb-2" onclick={() => resetTodos()}>Reset Todos</button>
</div>
<ul class="list-disc pl-6 space-y-1">
  {#each todos as todo, index (index)}
    <li class={{ 'line-through': todo.completed }}>
      <label>
        <input type="checkbox" checked={todo.completed} oninput={() => toggleTodo(index)}>
        {todo.text}
      </label>
    </li>
  {/each}
</ul>
<form onsubmit={addTodo} class="mt-2 max-w-xs flex gap-1 items-center">
  <input type="text" name="todo" placeholder="Add a new todo" class="input" />
  <button type="submit" class="btn">Add</button>
</form>
