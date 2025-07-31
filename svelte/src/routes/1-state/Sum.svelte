<script lang="ts">
  import sum from "./sum"

  let a = $state(0)
  let b = $state(0)
  let result = $state(0)
</script>

<h2 class="text-lg font-bold mb-2">Sum Calculator</h2>

<div class="flex gap-1 max-w-xs">
  <!-- สามารถใช้ <input bind:value={a} /> แทนได้ แต่เราจะใช้วิธีก่อนจนกว่าจะเรียนรู้เรื่อง bind: -->
  <input class="input" type="number" value={a} oninput={e => a = Number((e.target as HTMLInputElement).value)} />
  <input class="input" type="number" value={b} oninput={e => b = Number((e.target as HTMLInputElement).value)} />
  <button class="btn btn-primary" onclick={() => result = sum(a, b)}>Sum</button>
</div>

<p class="mt-1">Result: {result}</p>
