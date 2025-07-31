<script lang="ts">
  import { goto } from "$app/navigation";

  let input = $state({
    title: '',
    description: '',
    price: 0,
  })
  let loading = $state(false)

  async function onsubmit(event: Event) {
    event.preventDefault()
    loading = true
    try {
      const res = await fetch('/9-routing/api/products', {
        method: 'POST',
        body: JSON.stringify(input),
      })
      if (!res.ok) {
        throw new Error(await res.json().then(data => data.error || 'Failed to create product'))
      }
      goto('/9-routing/products')
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : 'An error occurred while creating the product')
    }
    loading = false
  }
</script>

<h1 class="text-xl font-bold">Create new product</h1>

<form {onsubmit} class="space-y-4 mt-4">
  <div>
    <label for="title" class="font-bold mb-1 block">Title</label>
    <input id="title" type="text" bind:value={input.title} class="input" placeholder="Enter product title" required />
  </div>

  <div>
    <label for="description" class="font-bold mb-1 block">Description</label>
    <input id="description" type="text" bind:value={input.description} class="input" placeholder="Enter product description" required />
  </div>

  <div>
    <label for="price" class="font-bold mb-1 block">Price</label>
    <input id="price" type="number" bind:value={input.price} class="input" placeholder="Enter product price" required />
  </div>

  <button type="submit" class="btn" disabled={loading}>Create Product</button>
</form>
