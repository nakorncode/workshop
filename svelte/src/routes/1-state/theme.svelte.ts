// กรณีที่จะใช้ Runes Syntax จำเป็นต้องตั้งชื่อไฟล์ `.svelte.js` หรือ `.svelte.ts` เสมอ

export const theme = $state<{ value: 'light' | 'dark' }>({ value: 'light' })

export function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
