<script lang="ts">
  let age = $state(10)
  let isAdultEffect = $state(false)

  $effect(() => {
    console.log('Effect called') // เรียกทุกครั้ง แม้ว่า isAdultEffect จะไม่ได้นำข้อมูลไปใช้งาน
    isAdultEffect = age >= 18
  })
  let isAdultDerived = $derived(age >= 18)
  let isAdultDerivedBy = $derived.by(() => {
    console.log('Derived by function called') // เรียกเฉพาะตอนที่ isAdultDerivedBy ถูกนำไปใช้งาน
    return age >= 18
  })
</script>

<h2 class="text-xl font-bold mb-2">Age</h2>
<p class="mb-1">Age: {age}</p>
<button class="btn" type="button" onclick={() => age++}>Increase Age</button>

{#if age >= 15}
  <div class="mt-4">
    <p>Keep going!</p>
    <ul class="list-disc pl-6">
      <li>isAdultEffect: {isAdultEffect}</li>
      <li>isAdultDerived: {isAdultDerived}</li>
      <li>isAdultDerivedBy: {isAdultDerivedBy}</li>
    </ul>
  </div>
{/if}
