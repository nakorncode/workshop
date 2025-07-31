<script lang="ts">
  import type { PageProps } from "./$types"
  let props: PageProps = $props()
</script>

<h1 class="text-xl font-bold mb-2">{props.data.product.title}</h1>
<p class="text-sm text-gray-500">ID: {props.params.id}</p>

<p class="mt-5">Description: {props.data.product.description}</p>
<p class="mt-1">Price: ${props.data.product.price.toFixed(2)}</p>

<form method="POST">
  <input type="hidden" name="id" value={props.params.id} />
  <button type="submit" class="text-red-700 underline cursor-pointer mt-6 text-sm">Delete</button>
</form>
