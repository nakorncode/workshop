<script lang="ts">
  import { theme } from "./theme.svelte";
</script>

<div class="space-x-2">
  <label>
    <input type="radio" name="theme" value="light" checked={theme.value === 'light'} oninput={() => theme.value = 'light'} />
    Light
  </label>
  <label>
    <input type="radio" name="theme" value="dark" checked={theme.value === 'dark'} oninput={() => theme.value = 'dark'} />
    Dark
  </label>
</div>
