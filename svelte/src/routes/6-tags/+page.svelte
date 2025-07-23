<script lang="ts">
  import { simpleSortable } from './simpleSortable';
  import { tooltip } from './tooltip';

  const htmlText = '<b>Bold</b> <i>Italic</i> <u>Underline</u> <strike>Strikethrough</strike>'
  const boxes: [number, number][] = [
    [250, 100],
    [150, 200],
    [200, 150],
  ]

  const users: { name: string; age: number; email: string; }[] = [
    { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
    { name: 'Alice Johnson', age: 28, email: 'alice.johnson@example.com' },
    { name: 'Bob Brown', age: 35, email: 'bob.brown@example.com' },
    { name: 'Charlie White', age: 22, email: 'charlie.white@example.com' }
  ]
</script>

<div class="space-y-3">
  <div class="p-4 rounded-lg bg-gray-200">
    {htmlText}
  </div>
  <div class="p-4 rounded-lg bg-gray-200">
    {@html htmlText}
  </div>
</div>

<hr class="my-4">

<div class="flex gap-4">
  {#each boxes as [width, height], i (i)}
    {@const area = width * height}
    <div class="p-4 rounded-lg bg-gray-200" style="width: {width}px; height: {height}px;">
      {width} x {height}px ({area}px²)
    </div>
  {/each}
</div>

<hr class="my-4">

{#snippet userInfo(name: string, age: number, email: string)}
  <div class="p-4 rounded-lg bg-gray-200">
    <h2 class="text-lg font-bold">User Information</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Age:</strong> {age}</p>
    <p><strong>Email:</strong> {email}</p>
  </div>
{/snippet}

<div class="grid grid-cols-2 gap-4">
  {@render userInfo('John Doe', 30, 'john.doe@example.com')}
  {@render userInfo('Jane Smith', 25, 'jane.smith@example.com')}
</div>

<hr class="my-4">

<div class="flex gap-4">
  <abbr {@attach tooltip('HyperText Markup Language')} class="text-blue-500 underline decoration-dotted cursor-default">HTML</abbr>
  <abbr {@attach tooltip('Cascading Style Sheets')} class="text-blue-500 underline decoration-dotted cursor-default">CSS</abbr>
  <abbr {@attach tooltip('JavaScript', { arrow: false })} class="text-blue-500 underline decoration-dotted cursor-default">JS</abbr>
</div>

<hr class="my-4">

<div>
  <table {@attach simpleSortable()}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.email}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  @reference 'tailwindcss';
  table {
    @apply w-full text-left border-collapse;
  }
  th, td {
    @apply p-2 border-b border-gray-300;
  }
</style>
