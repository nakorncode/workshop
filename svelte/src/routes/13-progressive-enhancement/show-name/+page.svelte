<script lang="ts">
  import type { PageProps } from "./$types";

  let props: PageProps = $props()
</script>

<h1 class="text-xl font-bold mb-2">Show Name</h1>
<p class="text-gray-700">Your name is: {props.data.name}</p>
