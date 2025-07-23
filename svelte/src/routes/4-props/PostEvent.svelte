<script lang="ts">
  interface Props {
    title: string
    likes: number
    onLike: () => void    // รับ Callback สำหรับการกด Like
    onDislike: () => void // รับ Callback สำหรับการกด Dislike
  }

  let props: Props = $props()
</script>

<div class="p-4 bg-white border border-gray-200 rounded-xl shadow-md text-gray-700">
  <h2 class="text-xl font-bold mb-2">{props.title}</h2>
  <p class="text-gray-700 mb-4">Likes: {props.likes}</p>
  <button class="btn" onclick={props.onLike}>Like</button>
  <button class="btn bg-red-600" onclick={props.onDislike}>Dislike</button>
</div>
