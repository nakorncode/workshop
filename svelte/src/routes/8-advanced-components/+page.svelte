<!-- https://svelte.dev/docs/svelte/svelte-head -->
<svelte:head>
  <title>Advanced Components</title>
  <meta name="description" content="Explore advanced components in Svelte, including custom switches and modals.">
</svelte:head>

<script lang="ts">
  import BadSwitch from "./BadSwitch.svelte";
  import GoodSwitch from "./GoodSwitch.svelte";
  import IncorrectSwitch from "./IncorrectSwitch.svelte";
  import MyInput from "./MyInput.svelte"
  import MyModal from "./MyModal.svelte"

  function onLogin(event: Event) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const username = formData.get("username")
    const password = formData.get("password")
    alert(`Username: ${username}, Password: ${password}`)
  }

  let switchData1 = $state(false)
  let switchData2 = $state(false)
  let switchData3 = $state(false)

  let modal1Open = $state(false)
  let modal2Open = $state(false)
</script>

<!-- Extends Props -->
<form onsubmit={onLogin}>
  <div class="space-y-4 max-w-xs">
    <MyInput
      label="Username"
      name="username"
      type="text"
      placeholder="Enter your username..."
      required
      minlength={3}
      maxlength={20}
    />
    <MyInput
      label="Password"
      name="password"
      type="password"
      placeholder="Enter your password..."
      required
    />
    <button type="submit" class="btn">Submit</button>
  </div>
</form>

<hr class="my-4">

<!-- $binding (Two-way Binding) -->
<ul class="list-disc pl-8 mb-3">
  <li>Switch Data 1: {switchData1 ? '✅' : '❌'}</li>
  <li>Switch Data 2: {switchData2 ? '✅' : '❌'}</li>
  <li>Switch Data 3: {switchData3 ? '✅' : '❌'}</li>
</ul>

<div class="mb-3">
  <button type="button" class="btn" onclick={() => {
    switchData1 = true
    switchData2 = true
    switchData3 = true
  }}>
    Set All Switches to True
  </button>
  <button type="button" class="btn" onclick={() => {
    switchData1 = false
    switchData2 = false
    switchData3 = false
  }}>
    Set All Switches to False
  </button>
</div>

<div class="flex flex-col gap-2">
  <IncorrectSwitch checked={switchData1}>
    Toggle Switch 1 (Incorrect)
  </IncorrectSwitch>
  <BadSwitch value={switchData2} onUpdateValue={value => switchData2 = value}>
    Toggle Switch 2 (Bad)
  </BadSwitch>
  <GoodSwitch bind:value={switchData3}>
    Toggle Switch 3 (Good)
  </GoodSwitch>
</div>

<hr class="my-4">

<!-- Snippet with Props -->

<!-- Explicit -->
{#snippet button1({ toggle }: { toggle: () => void })}
  <button class="btn" onclick={toggle}>Toggle Modal</button>
{/snippet}
<MyModal button={button1} isOpen={modal1Open}>
  Content of the first modal.
</MyModal>

<!-- Implicit (แนะนำวิธีนี้) -->
<MyModal isOpen={modal2Open} duration={1000}>
  {#snippet button({ toggle })}
    <button
      class="mt-4 border border-gray-300 rounded px-4 py-2 cursor-pointer hover:border-gray-500"
      onclick={toggle}
    >
      Toggle Modal
    </button>
  {/snippet}
  <div>
    Content of the second modal.
  </div>
</MyModal>

<button type="button" class="mt-4 btn" onclick={() => modal1Open = true}>Open first modal</button>
