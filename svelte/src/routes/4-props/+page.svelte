<script lang="ts">
  import PostDerived from './PostDerived.svelte';
  import PostEvent from './PostEvent.svelte';
  import ProductCard, { type Props as ProductProps } from './ProductCard.svelte'
  import UserProfile from './UserProfile.svelte'

  const user = {
    name: 'Jane Dee',
    birthDate: new Date('1998-12-09'),
    gender: 'female'
  } as { name: string; birthDate: Date; gender: 'male' | 'female' }

  const products: ProductProps[] = [
    {
      title: 'Svelte Handbook',
      description: 'A comprehensive guide to Svelte.',
      price: 29.99
    },
    {
      title: 'Svelte for Beginners',
      description: 'An introductory course on Svelte.',
      price: 19.99
    },
    {
      title: 'Advanced Svelte Techniques',
      description: 'Learn advanced patterns in Svelte.',
      price: 39.99
    },
    {
      title: 'Svelte Design Patterns',
      description: 'Best practices for Svelte development.',
      price: 24.99
    }
  ]

  type PostEventList = {
    title: string
    likes: number
    onLike: () => void
    onDislike: () => void
  }[]

  let postEventList: PostEventList = $state([
    {
      title: 'Svelte Meetup',
      likes: 10,
      onLike: () => postEventList[0].likes++,
      onDislike: () => postEventList[0].likes--
    },
    {
      title: 'Svelte Workshop',
      likes: 5,
      onLike: () => postEventList[1].likes++,
      onDislike: () => postEventList[1].likes--
    }
  ])
  const totalEventLikes = $derived(postEventList.reduce((sum, post) => sum + post.likes, 0))

  let postDerivedList: PostEventList = $state([
    {
      title: 'Svelte Conference',
      likes: 20,
      onLike: () => postDerivedList[0].likes++,
      onDislike: () => postDerivedList[0].likes--
    },
    {
      title: 'Svelte Hackathon',
      likes: 15,
      onLike: () => postDerivedList[1].likes++,
      onDislike: () => postDerivedList[1].likes--
    }
  ])
  const totalDerivedLikes = $derived(postDerivedList.reduce((sum, post) => sum + post.likes, 0))
</script>

<div class="grid grid-cols-2 gap-4">
  <UserProfile name="John Doe" birthDate={new Date('1990-01-29')} gender="male" />
  <UserProfile {...user} />
</div>

<hr class="my-4">

<h2 class="mb-3 font-bold text-xl">Products</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {#each products as product}
  <ProductCard {...product} />
  {/each}
</div>

<hr class="my-4">

<h2 class="mb-3 font-bold text-xl">Posts (Event)</h2>
<p class="mb-1 font-bold">Total likes: {totalEventLikes}</p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <PostEvent {...postEventList[0]}></PostEvent>
  <PostEvent {...postEventList[1]}></PostEvent>
</div>

<hr class="my-4">

<h2 class="mb-3 font-bold text-xl">Posts (Derived)</h2>
<p class="mb-1 font-bold">Total likes: {totalDerivedLikes}</p>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <PostDerived {...postDerivedList[0]}></PostDerived>
  <PostDerived {...postDerivedList[1]}></PostDerived>
</div>
