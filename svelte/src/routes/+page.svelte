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
    { href: '/5-blocks', label: 'Blocks {#...}' },
    { href: '/6-tags', label: 'Tags {@...}' },
    { href: '/7-directives', label: 'Directives ...:' },
    { href: '/8-advanced-components', label: 'Advanced Components' },
    { href: '/9-routing', label: 'Routing' },
    { href: '/10-layouts', label: 'Layouts' },
    { href: '/11-env', label: 'Environment Variables' },
    { href: '/12-form-actions', label: 'Form Actions' },
    { href: '/13-progressive-enhancement', label: 'Progressive Enhancement' },
  ]
</script>

<h1 class="text-2xl font-bold mb-3">Svelte Workshop by NakornCode</h1>
<ol class="list-decimal pl-10 space-y-1 text-lg font-mono">
  {#each links as link, index (index)}
    <li>
      <a href={link.href} class="text-blue-600 underline">{link.label}</a>
    </li>
  {/each}
</ol>
