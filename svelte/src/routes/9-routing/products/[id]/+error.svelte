<script lang="ts">
  import { page } from '$app/state'
</script>

<h1 class="text-xl font-bold text-red-700">Error!</h1>
<p class="mb-4">{page.error?.message}</p>

<a href="/9-routing/products" class="text-blue-700 underline">Go back to products</a>
