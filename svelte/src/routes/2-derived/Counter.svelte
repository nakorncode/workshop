<script lang="ts">
  let count = $state(0)
  let double = $derived(count * 2) // รันใหม่ทุกครั้งที่ $state มีการเปลี่ยนแปลง
</script>

<h2 class="text-xl font-bold mb-2">Count</h2>
<p>Count: {count}</p>
<p>Count (Double): {double}</p>
<button type="button" class="btn mt-2" onclick={() => count++}>Increase</button>
