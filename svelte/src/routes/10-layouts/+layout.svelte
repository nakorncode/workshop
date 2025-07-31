<script lang="ts">
  let props = $props()
</script>

<div>
  <header class="mb-4 bg-gray-200 p-4 rounded-xl flex gap-4 items-center">
    <h1 class="font-bold text-xl">Main layout</h1>
    <ul class="flex gap-3">
      <li><a href="/10-layouts" class="underline text-blue-600">Main layout</a></li>
      <li><a href="/10-layouts/a" class="underline text-blue-600">A layout</a></li>
      <li><a href="/10-layouts/b" class="underline text-blue-600">B layout</a></li>
      <li><a href="/10-layouts/c" class="underline text-blue-600">C layout</a></li>
      <li><a href="/10-layouts/d" class="underline text-blue-600">D layout</a></li>
      <li><a href="/10-layouts/e" class="underline text-blue-600">E layout</a></li>
      <li><a href="/10-layouts/f" class="underline text-blue-600">F layout</a></li>
    </ul>
  </header>
  <main class="p-4 bg-gray-200 rounded-xl">
    {@render props.children()}
  </main>
</div>
