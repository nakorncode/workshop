<script lang="ts">
  import type { PageProps } from "./$types";

  let props: PageProps = $props()
</script>

<h1 class="text-xl font-bold">Product list</h1>

<a href="/9-routing/products/new" class="text-blue-700 underline">Create new product</a>

<ul class="list-disc pl-6 mt-3">
  {#each props.data.products as product}
    <li><a href={`/9-routing/products/${product.id}`} class="text-blue-700 underline">{product.title} - ${product.price}</a></li>
  {/each}
</ul>
