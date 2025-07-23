<script lang="ts">
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
