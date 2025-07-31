<script lang="ts">
  import { theme, toggleTheme } from './theme.svelte'
</script>

<button class="btn" onclick={toggleTheme}>
  Toggle Theme {theme.value === 'light' ? '☀️' : '🌙'}
</button>
