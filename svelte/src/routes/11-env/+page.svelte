<script lang="ts">
  import { PUBLIC_KEY } from "$env/static/public"
  import { env as envDynamic } from "$env/dynamic/public"
  import type { PageProps } from "./$types"
  const props: PageProps = $props()
</script>

<h2 class="text-xl font-bold mb-2">Environment Variables (Static)</h2>
<p>PUBLIC_KEY = {PUBLIC_KEY}</p>
<p>PRIVATE_KEY = {props.data.PRIVATE_KEY}</p>

<hr class="my-4">

<h2 class="text-xl font-bold mb-2">Environment Variables (Dynamic)</h2>
<p>PUBLIC_KEY = {envDynamic.PUBLIC_KEY}</p>
<p>PRIVATE_KEY = {props.data.DYNAMIC_PRIVATE_KEY}</p>
