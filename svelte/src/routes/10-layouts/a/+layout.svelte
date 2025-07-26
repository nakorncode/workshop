<script lang="ts">
  let props = $props()
</script>

<div>
  <header class="mb-4 bg-blue-100 border border-blue-300 p-4 rounded-xl flex gap-4 items-center">
    <h1 class="font-bold text-xl">A layout</h1>
    <ul class="flex gap-3">
      <li><a href="/10-layouts/a" class="underline text-blue-600">A</a></li>
      <li><a href="/10-layouts/a/1" class="underline text-blue-600">A1</a></li>
      <li><a href="/10-layouts/a/2" class="underline text-blue-600">A2</a></li>
      <li><a href="/10-layouts/a/3" class="underline text-blue-600">A3</a></li>
    </ul>
  </header>
  <main class="p-4 bg-blue-100 border border-blue-300 rounded-xl">
    {@render props.children()}
  </main>
</div>
