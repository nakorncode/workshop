<script lang="ts">
  let props = $props()
</script>

<div>
  <header class="mb-4 bg-purple-100 border border-purple-300 p-4 rounded-xl font-bold text-xl">
    <h1>E & F layout</h1>
  </header>
  <main class="p-4 bg-purple-100 border border-purple-300 rounded-xl">
    {@render props.children()}
  </main>
</div>
