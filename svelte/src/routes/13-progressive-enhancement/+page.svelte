<script lang="ts">
  import { enhance } from "$app/forms"
  import type { PageProps } from "./$types"

  let props: PageProps = $props()

  let loading = $state(false)
</script>

<div class="max-w-xs">
  <form method="POST" action="?/setName" use:enhance>
    <input type="text" name="name" placeholder="Enter your name" class="input" />
    <button type="submit" class="btn mt-2">Submit</button>
  </form>

  <hr class="my-4">

  <form method="POST" action="?/getSum" class="space-y-2" use:enhance>
    {#if props.form?.sum}
      <p class="text-green-600">Sum: {props.form.sum}</p>
    {/if}
    {#if props.form?.error}
      <p class="text-red-600">{props.form.error}</p>
    {/if}
    <input type="text" name="a" placeholder="Enter first number" class="input" />
    <input type="text" name="b" placeholder="Enter second number" class="input" />
    <button type="submit" class="btn">Calculate Sum</button>
  </form>

  <hr class="my-4">

  <!-- https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-Customising-use:enhance -->
  <form method="POST" action="?/slowResponse" class="space-y-2" use:enhance={() => {
    loading = true
    return async () => {
      loading = false
    }
  }}>
    {#if props.form?.message}
      <p class="text-gray-600 italic">{props.form.message}</p>
    {/if}
    <button type="submit" class="btn" disabled={loading}>{loading ? 'Loading...' : 'Get Slow Response'}</button>
  </form>
</div>
