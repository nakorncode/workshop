<script lang="ts">
  export interface Props {
    title: string
    description: string
    price: number
  }

  let props: Props = $props()
</script>

<div class="p-4 bg-white border border-gray-200 rounded-xl shadow-md text-gray-700">
  <h2 class="text-xl font-bold mb-2">{props.title}</h2>
  <p class="text-gray-700 mb-4">{props.description}</p>
  <p class="text-lg font-semibold">${props.price.toFixed(2)}</p>
</div>
