<script lang="ts">
  let props = $props()
</script>

<div>
  <header class="mb-4 bg-green-100 border border-green-300 p-4 rounded-xl font-bold text-xl">
    <h1>C & D layout</h1>
  </header>
  <main class="p-4 bg-green-100 border border-green-300 rounded-xl">
    {@render props.children()}
  </main>
</div>
