<script lang="ts">
  let props = $props()
</script>

<div class="text-gray-800">
  <nav class="mx-auto max-w-md">
    <ul class="flex gap-4 bg-gray-100 p-4 rounded-lg">
      <li class="font-bold">9-routing</li>
      <li><a href="/9-routing">Home</a></li>
      <li><a href="/9-routing/products">Products</a></li>
    </ul>
  </nav>

  <main class="mx-auto max-w-md mt-4">
    {@render props.children()}
  </main>
</div>

<style>
  @reference "tailwindcss";
  a {
    @apply underline text-blue-700;
  }
</style>
