<script lang="ts">
  import { onMount } from "svelte";

  let note = $state('');
  let lastedSavedTime = $state<Date | null>(null);

  // รันก็ต่อเมื่อ Component เริ่มใช้งาน (เนื่องจากต้องรอให้ DOM พร้อมก่อน จึงจะสามารถใช้ window.localStorage ได้)
  onMount(() => {
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      note = savedNote;
    }
  });

  // รันทุกครั้งที่ $state() มีการเปลี่ยนแปลง
  $effect(() => {
    console.log('Note saved:', note);
    localStorage.setItem('note', note);
    lastedSavedTime = new Date();
  });

</script>

<h2 class="text-xl font-bold mb-2">Note</h2>
<p class="mb-1 text-sm text-gray-600">Last saved: {lastedSavedTime?.toLocaleString()}</p>
<textarea
  class="input w-full h-32"
  value={note}
  oninput={e => note = (e.target as HTMLTextAreaElement).value}
  placeholder="Write your note here..."
></textarea>
