<script lang="ts">
  import { theme } from './theme.svelte';
</script>

<div class={{ 'dark': theme.value === 'dark' }}>
  <div class="p-4 border border-gray-200 rounded shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-white">
    This is a simple "{theme.value}" card component.
  </div>
</div>
