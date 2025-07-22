<script lang="ts">
  let count = 0              // ไม่อัปเดต เพราะเป็นตัวแปรธรรมดา
  let countState = $state(0) // ต้องตั้งค่าเป็น $state() เมื่อ let countState เปลี่ยนแปลง จะมีการอัปเดต UI ส่วนนั้นให้

  console.log('Count: (console.log)', countState) // log เพียงครั้งเดียวเมื่อเริ่มต้น
  $inspect('Count: ($inspect)', countState)       // log ทุกครั้งที่ countState เปลี่ยนแปลง
</script>

<p>Count: {count}</p>
<button class="mt-1 btn" onclick={() => count++}>Increment</button>

<hr class="my-4">

<p>Count ($state): {countState}</p>
<button class="mt-1 btn" onclick={() => countState++}>Increment</button>
