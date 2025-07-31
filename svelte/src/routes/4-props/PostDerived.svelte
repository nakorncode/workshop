<script lang="ts">
  interface Props {
    title: string
    likes: number
  }

  let props: Props = $props()

  let likes = $derived(props.likes) // ใช้ $derived เพื่อให้ likes เป็น Reactive ภายใน Component
  // เนื่องจาก Props is readonly ไม่สามารถที่จะ Mutate props.likes ได้โดยตรง
  // ดังนั้นหากต้องการส่งข้อมูลไปใช้ต่อ แนะนำให้ใช้ Callback จากในตัวอย่าง PostEvent.svelte
</script>

<div class="p-4 bg-white border border-gray-200 rounded-xl shadow-md text-gray-700">
  <h2 class="text-xl font-bold mb-2">{props.title}</h2>
  <p class="text-gray-700 mb-4">Likes: {likes}</p>
  <button class="btn" onclick={() => likes++}>Like</button>
  <button class="btn bg-red-600" onclick={() => likes--}>Dislike</button>
</div>
