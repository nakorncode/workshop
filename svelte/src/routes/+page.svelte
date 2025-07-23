<script lang="ts">
  interface Link {
    href: string
    label: string
  }
  const links: Link[] = [
    { href: '/1-state', label: '$state()' },
    { href: '/2-effect', label: '$effect()' },
    { href: '/3-derived', label: '$derived()' },
    { href: '/4-props', label: '$props()' },
    { href: '/5-blocks', label: 'Blocks {#...}' }
  ]
</script>

<h1 class="text-2xl font-bold mb-3">Svelte Workshop by NakornCode</h1>
<ol class="list-decimal pl-8 space-y-1 text-lg font-mono">
  {#each links as link, index (index)}
    <li>
      <a href={link.href} class="text-blue-600 underline">{link.label}</a>
    </li>
  {/each}
</ol>
