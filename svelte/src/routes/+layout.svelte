<svelte:head>
  <title>Svelte Workshop by NakornCode</title>
</svelte:head>

<script lang="ts">
	import '../app.css'

	let { children } = $props()
</script>

<div class="p-4">
  {@render children()}
</div>
