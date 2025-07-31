<script lang="ts">
  let time = $state(0)
	let milliseconds = $state(1000)

	$effect(() => {
    console.log('Timer effect running with milliseconds:', milliseconds)
		const interval = setInterval(() => {
			time += 1 // ส่วนนี้ time จะ untrack() เพราะเป็น Sub function ภายในอีกที
      // ถ้าใครใช้ React จะเข้าใจดี ว่าหากติดตามข้อมูล deps ของ time ด้วย จะเกิดการรันเบิ้ลซ้ำๆ
		}, milliseconds)

    // ถ้าไม่ได้ Cleanup เมื่อ milliseconds เปลี่ยนแปลง จะทำให้เกิดการเรียก setInterval ซ้ำๆ
		return () => {
			clearInterval(interval)
		}
	})
</script>

<h2 class="text-xl font-bold mb-2">Timer</h2>

<div class="mb-3">
  <p>Time: {time}</p>
  <p>Speed: {1000 / milliseconds}x</p>
</div>

<button class="btn" onclick={() => (milliseconds *= 2)}>Slower 🚶‍♂️🐌</button>
<button class="btn" onclick={() => (milliseconds /= 2)}>Faster 🏃‍♂️💨</button>
