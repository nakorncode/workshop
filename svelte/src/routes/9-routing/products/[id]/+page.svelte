<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types"
  let props: PageProps = $props()
  async function deleteProduct() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/9-routing/api/products/${props.params.id}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error(await res.json().then(data => data.error || 'Failed to delete product'))
      }
      goto('/9-routing/products')
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'An error occurred while deleting the product')
    }
  }
</script>

<h1 class="text-xl font-bold mb-2">{props.data.product.title}</h1>
<p class="text-sm text-gray-500">ID: {props.params.id}</p>

<p class="mt-5">Description: {props.data.product.description}</p>
<p class="mt-1">Price: ${props.data.product.price.toFixed(2)}</p>

<button class="text-red-700 underline cursor-pointer mt-6 text-sm" onclick={deleteProduct}>Delete</button>
