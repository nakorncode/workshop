<script lang="ts">
  const age = 15
  const fruits = ['Apple', 'Banana', 'Cherry']
  const vegetables: string[] = []

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function fetchProduct() {
    await delay(2000) // จำลองว่าทำงานช้า
    const products = await fetch('https://dummyjson.com/products/1?select=title,price').then(response => response.json())
    return products as { id: number; title: string; price: number }
  }
</script>

<!-- if, else if, else -->
{#if age >= 18}
  <p>You are an adult.</p>
{:else if age >= 13}
  <p>You are a teenager.</p>
{:else}
  <p>You are a child.</p>
{/if}

<hr class="my-4">

<!-- each -->
{#each fruits as fruit, index (index)}
  <p>Fruit {index + 1}: {fruit}</p>
{/each}

<hr class="my-4">

{#each vegetables as vegetable, index (index)}
  <p>Vegetable {index + 1}: {vegetable}</p>
{:else}
  <p>No vegetables available.</p>
{/each}

<hr class="my-4">

<!-- await -->
{#await fetchProduct()}
  <p class="text-gray-400 italic">Loading product...</p>
{:then product}
  <p><b>Product:</b> {product.title} - <b>Price:</b> ${product.price}</p>
{:catch error}
  <p>Error fetching product: {error.message}</p>
{/await}
