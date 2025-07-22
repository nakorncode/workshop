<script lang="ts">
  let note = $state('')
  function saveNote() {
    localStorage.setItem('note', note)
  }
  function loadNote() {
    const savedNote = localStorage.getItem('note')
    if (savedNote) {
      note = savedNote
    }
  }
</script>

<div class="max-w-xs">
  <h2 class="text-xl font-bold mb-2">Note</h2>
  <textarea class="input" rows="7" placeholder="Enter your note here..." oninput={(event) => note = (event.target as HTMLTextAreaElement).value}>{note}</textarea>
  <button type="button" class="btn" onclick={saveNote}>Save Note</button>
  <button type="button" class="btn" onclick={loadNote}>Load Note</button>
</div>
