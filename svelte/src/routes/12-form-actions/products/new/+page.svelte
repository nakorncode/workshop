<script lang="ts">
  import type { PageProps } from "./$types";

  let props: PageProps = $props()
</script>

<h1 class="text-xl font-bold mb-2">Create new product</h1>

{#if props.form?.error}
  <p class="text-red-500 mb-1">{props.form.error}</p>
{/if}

<form method="POST" class="space-y-4">
  <div>
    <label for="title" class="font-bold mb-1 block">Title</label>
    <input id="title" type="text" name="title" class="input" placeholder="Enter product title" />
  </div>

  <div>
    <label for="description" class="font-bold mb-1 block">Description</label>
    <input id="description" type="text" name="description" class="input" placeholder="Enter product description" />
  </div>

  <div>
    <label for="price" class="font-bold mb-1 block">Price</label>
    <input id="price" type="number" name="price" class="input" placeholder="Enter product price" />
  </div>

  <button type="submit" class="btn">Create Product</button>
</form>
