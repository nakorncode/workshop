import 'tippy.js/dist/tippy.css'
import tippy, { type Props } from 'tippy.js'

export function tooltip(node: HTMLElement, options: Partial<Props>) {
  $effect(() => {
    const tooltip = tippy(node, {
      ...options,
      allowHTML: true,
      arrow: true,
      placement: 'top',
      theme: 'light',
    })
    return tooltip.destroy
  })
}
