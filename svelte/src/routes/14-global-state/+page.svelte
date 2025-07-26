<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types"

  let props: PageProps = $props()
</script>

<div class="max-w-xs">
  <div class="mb-3">
    <p>incorrectUsername: Hello, {props.data.incorrectUsername ? props.data.incorrectUsername : 'Guest'}</p>
    <p>correctUsername: Hello, {props.data.correctUsername ? props.data.correctUsername : 'Guest'}</p>
  </div>

  <hr class="my-4">

  <h2 class="mb-2 font-bold">Incorrect</h2>
  <form method="POST" action="?/incorrect" class="space-y-2" use:enhance>
    <input type="text" name="username" placeholder="Username" class="input" />
    <input type="password" name="password" placeholder="Password" class="input" />
    <button type="submit" class="btn">Login</button>
    {#if props.form?.error}
      <p class="text-red-600">{props.form.error}</p>
    {/if}
  </form>

  <hr class="my-4">

  <h2 class="mb-2 font-bold">Correct</h2>
  <form method="POST" action="?/correct" class="space-y-2" use:enhance>
    <input type="text" name="username" placeholder="Username" class="input" />
    <input type="password" name="password" placeholder="Password" class="input" />
    <button type="submit" class="btn">Login</button>
    {#if props.form?.error}
      <p class="text-red-600">{props.form.error}</p>
    {/if}
  </form>
</div>
