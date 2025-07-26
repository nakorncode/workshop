<script lang="ts">
  import { page } from "$app/state"
</script>

<h1 class="text-xl font-bold mb-2">Error</h1>
<p class="text-red-500">An error occurred: {page.error?.message}</p>
