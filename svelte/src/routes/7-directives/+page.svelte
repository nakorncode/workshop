<script lang="ts">
  import ShowProfile from "./ShowProfile.svelte";
import type { Props as Profile } from "./ShowProfile.svelte";

  const color = 'red'
  const isTextGreen = true
  const isBgGreen = true

  let profile = $state<Profile>({
    name: '',
    birthDate: new Date(),
    salary: 0,
    married: false,
    gender: 'male',
    country: '',
    avatar: null
  })
</script>

<div class="space-y-2 font-bold">
  <p style="color: red;">Red text</p>
  <p style:color="red">Red text</p>
  <p style:color={color}>Red text</p>
  <p style:color>Red text</p>
  <p style:color="white" style:background-color="black">White text; Black background</p>
  <p class="text-red-700" style:color|important="green">Should be green</p>
</div>

<hr class="my-4">

<div class="space-y-2 font-bold">
  <p class="text-green-800 bg-green-100">Green text; Green background</p>
  <p class={isTextGreen && 'text-green-800'}>Green text</p>
  <p class={isBgGreen && 'bg-green-100'}>Green background</p>
  <p class={[isTextGreen && 'text-green-800', isBgGreen && 'bg-green-100']}>Green text; Green background</p>
  <p class={{ 'text-green-800': isTextGreen, 'bg-green-100': isBgGreen }}>Green text; Green background</p>
  <p class:text-green-800={isTextGreen} class:bg-green-100={isBgGreen}>Green text; Green background</p>
</div>

<hr class="my-4">

<div class="mb-3">
  <ShowProfile {...profile} />
</div>

<form class="grid grid-cols-3 gap-4">
  <label class="block">
    <span class="inline-block mb-1">Name:</span>
    <input type="text" bind:value={profile.name} class="input" />
  </label>
  <label class="block">
    <span class="inline-block mb-1">Birth Date:</span>
    <input type="date" bind:value={
      () => {
        // get
        const date = new Date(profile.birthDate);
        try {
          return date.toISOString().split('T')[0];
        } catch (error) {
          return new Date().toISOString().split('T')[0];
        }
      },
      (value: string) => {
        // set
        const [year, month, day] = value.split('-').map(Number);
        profile.birthDate = new Date(year, month - 1, day);
      }
    } class="input" />
  </label>
  <label class="block">
    <span class="inline-block mb-1">Salary:</span>
    <input type="number" bind:value={profile.salary} class="input" />
  </label>
  <label class="block">
    <span class="inline-block mb-1">Country:</span>
    <select bind:value={profile.country} class="input">
      <option value="">Select a country</option>
      <option value="Thailand">Thailand</option>
      <option value="USA">USA</option>
      <option value="Canada">Canada</option>
      <option value="UK">UK</option>
      <option value="Australia">Australia</option>
    </select>
  </label>
  <label class="block">
    <span class="inline-block mb-1">Avatar:</span>
    <input type="file" accept="image/*" bind:files={profile.avatar} class="input" />
  </label>
  <div class="self-center">
    <label class="block">
      <input type="checkbox" bind:checked={profile.married} />
      <span class="inline-block">Married</span>
    </label>
    <div class="mt-2">
      <span class="mr-1">Gender:</span>
      <label class="mr-2">
        <input type="radio" bind:group={profile.gender} value="male" />
        <span>Male</span>
      </label>
      <label>
        <input type="radio" bind:group={profile.gender} value="female" />
        <span>Female</span>
      </label>
    </div>
  </div>
</form>

<!--
text name
number salary
radio gender
checkbox married
select country
file avatar
-->

<!-- this -->
<!-- $bindable -->
