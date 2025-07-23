import type { Attachment } from 'svelte/attachments'
import 'tippy.js/dist/tippy.css'
import tippy, { type Props } from 'tippy.js'

export function tooltip(text: string, options?: Partial<Props>): Attachment {
  return (element) => {
    const tooltip = tippy(element, {
      content: text,
      ...options,
    })
    return tooltip.destroy
  }
}
